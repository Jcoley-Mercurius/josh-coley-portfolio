import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { handleContact, MAX_BODY_BYTES, type ContactConfig } from "./contact-handler.ts";
import { normalizeInquiry, validateInquiry } from "./inquiry.ts";

const config: ContactConfig = {
  apiKey: "re_test_secret",
  from: "Mercurius Solutions <onboarding@resend.dev>",
  to: "owner@example.org",
};

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.org",
  service: "booking",
  message: "We need a booking site for a two-chair barbershop.",
  website: "",
};

const key = "3f2b8c1e-5d4a-4c8b-9e7f-0a1b2c3d4e5f";

function post(
  body: unknown,
  headers: Record<string, string> = {},
): Request {
  return new Request("https://portfolio.test/api/contact", {
    method: "POST",
    headers: {
      host: "portfolio.test",
      origin: "https://portfolio.test",
      "content-type": "application/json",
      "idempotency-key": key,
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

type Call = { url: string; init: RequestInit };

function provider(response: Response | Error) {
  const calls: Call[] = [];
  const send = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    if (response instanceof Error) throw response;
    return response;
  }) as typeof fetch;
  return { calls, send };
}

const ok = () => new Response(JSON.stringify({ id: "email_1" }), { status: 200 });

let logged: unknown[][] = [];
const originalError = console.error;
beforeEach(() => {
  logged = [];
  console.error = (...args: unknown[]) => {
    logged.push(args);
  };
});
afterEach(() => {
  console.error = originalError;
});

async function outcome(response: Response) {
  return { status: response.status, body: await response.json() };
}

test("valid inquiry is sent once with a fixed recipient and visitor reply-to", async () => {
  const { calls, send } = provider(ok());
  const result = await outcome(await handleContact(post(valid), config, send));

  assert.deepEqual(result, { status: 202, body: { outcome: "accepted" } });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  const headers = calls[0].init.headers as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer re_test_secret");
  assert.equal(headers["Idempotency-Key"], `portfolio-inquiry/${key}`);
  const sent = JSON.parse(calls[0].init.body as string);
  assert.equal(sent.from, config.from);
  assert.deepEqual(sent.to, ["owner@example.org"]);
  assert.equal(sent.reply_to, "ada@example.org");
  assert.equal(sent.subject, "Project inquiry from Ada Lovelace");
  assert.match(sent.text, /Project type: Booking experience/);
  assert.match(sent.text, /two-chair barbershop/);
  assert.ok(!("website" in sent));
});

test("fields are trimmed before validation and sending", async () => {
  const { calls, send } = provider(ok());
  await handleContact(post({ ...valid, name: "  Ada  ", email: " ada@example.org " }), config, send);
  const sent = JSON.parse(calls[0].init.body as string);
  assert.equal(sent.reply_to, "ada@example.org");
  assert.equal(sent.subject, "Project inquiry from Ada");
});

test("invalid fields return field errors without calling the provider", async () => {
  const { calls, send } = provider(ok());
  const result = await outcome(
    await handleContact(
      post({ ...valid, name: " ", email: "not-an-email", service: "crypto", message: "short" }),
      config,
      send,
    ),
  );
  assert.equal(result.status, 400);
  assert.equal(result.body.outcome, "invalid");
  assert.deepEqual(Object.keys(result.body.errors).sort(), ["email", "message", "name", "service"]);
  assert.equal(calls.length, 0);
});

test("unexpected, missing-type and non-object bodies are rejected", async () => {
  const { calls, send } = provider(ok());
  for (const body of [
    { ...valid, phone: "555" },
    { ...valid, name: 42 },
    [valid],
    "null",
    "{not json",
  ]) {
    const response = await handleContact(post(body), config, send);
    assert.equal(response.status, 400, JSON.stringify(body));
  }
  assert.equal(calls.length, 0);
});

test("honeypot submissions look accepted but are never sent", async () => {
  const { calls, send } = provider(ok());
  const result = await outcome(
    await handleContact(post({ ...valid, website: "https://spam.example" }), config, send),
  );
  assert.deepEqual(result, { status: 202, body: { outcome: "accepted" } });
  assert.equal(calls.length, 0);
});

test("missing or malformed idempotency key is rejected", async () => {
  const { calls, send } = provider(ok());
  for (const value of ["", "short", "has spaces in the key value"]) {
    const response = await handleContact(post(valid, { "idempotency-key": value }), config, send);
    assert.equal(response.status, 400);
  }
  assert.equal(calls.length, 0);
});

test("wrong content type and oversized bodies are rejected", async () => {
  const { calls, send } = provider(ok());
  const form = await handleContact(
    post("name=Ada", { "content-type": "application/x-www-form-urlencoded" }),
    config,
    send,
  );
  assert.equal(form.status, 415);

  const big = { ...valid, message: "x".repeat(MAX_BODY_BYTES) };
  assert.equal((await handleContact(post(big), config, send)).status, 413);
  assert.equal(calls.length, 0);
});

test("cross-origin posts are refused; same-origin and origin-less posts pass", async () => {
  const { calls, send } = provider(ok());
  const cross = await handleContact(post(valid, { origin: "https://evil.example" }), config, send);
  assert.equal(cross.status, 403);

  const forwarded = await handleContact(
    post(valid, { host: "internal:3000", "x-forwarded-host": "portfolio.test" }),
    config,
    send,
  );
  assert.equal(forwarded.status, 202);
  assert.equal(calls.length, 1);
});

test("missing configuration reports unavailable without calling the provider", async () => {
  const { calls, send } = provider(ok());
  for (const partial of [{}, { ...config, apiKey: "" }, { ...config, to: undefined }]) {
    const result = await outcome(await handleContact(post(valid), partial, send));
    assert.deepEqual(result, { status: 503, body: { outcome: "unavailable" } });
  }
  assert.equal(calls.length, 0);
});

test("provider rejection and network failure report unavailable and log no personal data", async () => {
  const cases: (Response | Error)[] = [
    new Response(JSON.stringify({ statusCode: 403, name: "validation_error", message: "x" }), {
      status: 403,
    }),
    new Response(JSON.stringify({ name: "concurrent_idempotent_requests" }), { status: 409 }),
    new Response(JSON.stringify({ name: "rate_limit_exceeded" }), { status: 429 }),
    new Response("gateway", { status: 502 }),
    Object.assign(new Error("timed out"), { name: "TimeoutError" }),
  ];
  for (const response of cases) {
    const { send } = provider(response);
    const result = await outcome(await handleContact(post(valid), config, send));
    assert.deepEqual(result, { status: 503, body: { outcome: "unavailable" } });
  }
  const log = JSON.stringify(logged);
  assert.ok(logged.length >= cases.length);
  for (const secret of ["ada@example.org", "barbershop", "Ada Lovelace", "re_test_secret", "owner@example.org"]) {
    assert.ok(!log.includes(secret), `log leaked ${secret}`);
  }
});

test("responses are never cached", async () => {
  const { send } = provider(ok());
  const response = await handleContact(post(valid), config, send);
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("validation boundaries", () => {
  const base = normalizeInquiry({ name: "A", email: "a@b.co", service: "", message: "x".repeat(20) });
  assert.deepEqual(validateInquiry(base), {});
  assert.ok(validateInquiry({ ...base, message: "x".repeat(19) }).message);
  assert.deepEqual(validateInquiry({ ...base, message: "x".repeat(3000) }), {});
  assert.ok(validateInquiry({ ...base, message: "x".repeat(3001) }).message);
  assert.ok(validateInquiry({ ...base, name: "x".repeat(101) }).name);
  assert.ok(validateInquiry({ ...base, name: "Ada\nBcc: x@y.z" }).name);
  assert.deepEqual(validateInquiry({ ...base, message: "line one\nline two\tok here" }), {});
  assert.ok(validateInquiry({ ...base, email: "a@b" }).email);
  assert.ok(validateInquiry({ ...base, email: "Ada <a@b.co>" }).email);
  assert.equal(normalizeInquiry({ ...base, message: "  a\r\nb  " }).message, "a\nb");
});
