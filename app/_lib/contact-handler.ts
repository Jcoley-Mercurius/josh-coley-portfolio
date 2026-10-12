import {
  inquiryKeys,
  normalizeInquiry,
  serviceLabel,
  validateInquiry,
  type InquiryErrors,
  type InquiryOutcome,
} from "./inquiry.ts";

// Server side of the project inquiry. Kept free of Next and process.env so the
// unit tests can drive it with a fake provider; app/api/contact/route.ts wires
// in the real configuration and fetch.
//
// Abuse control is layered: a Vercel Firewall rate-limit rule on this path
// (answers 429 before the function runs), the honeypot field, a bounded body,
// strict field checks and a same-origin check. The origin check only stops
// casual cross-site posts; it is not abuse prevention on its own.

export interface ContactConfig {
  apiKey?: string;
  from?: string;
  to?: string;
}

export const MAX_BODY_BYTES = 8 * 1024;
const RESEND_URL = "https://api.resend.com/emails";
const PROVIDER_TIMEOUT_MS = 10_000;
const idempotencyKeyPattern = /^[A-Za-z0-9-]{16,128}$/;

type Send = typeof fetch;

function reply(status: number, outcome: InquiryOutcome, errors?: InquiryErrors) {
  return Response.json(errors ? { outcome, errors } : { outcome }, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function handleContact(
  request: Request,
  config: ContactConfig,
  send: Send = fetch,
): Promise<Response> {
  if (!sameOrigin(request)) return reply(403, "invalid");

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) return reply(415, "invalid");

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return reply(413, "invalid");
  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return reply(413, "invalid");

  const idempotencyKey = request.headers.get("idempotency-key") ?? "";
  if (!idempotencyKeyPattern.test(idempotencyKey)) return reply(400, "invalid");

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return reply(400, "invalid");
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return reply(400, "invalid");
  }
  const fields = body as Record<string, unknown>;
  const allowed: readonly string[] = inquiryKeys;
  if (Object.keys(fields).some((key) => !allowed.includes(key))) return reply(400, "invalid");
  if (Object.values(fields).some((value) => typeof value !== "string")) {
    return reply(400, "invalid");
  }
  const text = (key: string) => (fields[key] as string | undefined) ?? "";

  // Honeypot: answer as if accepted so automated senders learn nothing.
  if (text("website") !== "") return reply(202, "accepted");

  const inquiry = normalizeInquiry({
    name: text("name"),
    email: text("email"),
    service: text("service"),
    message: text("message"),
  });
  const errors = validateInquiry(inquiry);
  if (Object.keys(errors).length > 0) return reply(400, "invalid", errors);

  if (!config.apiKey || !config.from || !config.to) {
    console.error("contact: not configured");
    return reply(503, "unavailable");
  }

  let response: Response;
  try {
    response = await send(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `portfolio-inquiry/${idempotencyKey}`,
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: inquiry.email,
        subject: `Project inquiry from ${inquiry.name}`,
        text: [
          `Name: ${inquiry.name}`,
          `Email: ${inquiry.email}`,
          `Project type: ${serviceLabel(inquiry.service)}`,
          "",
          inquiry.message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
    });
  } catch (error) {
    console.error("contact: provider unreachable", (error as Error).name);
    return reply(503, "unavailable");
  }

  if (response.ok) return reply(202, "accepted");

  // Log the provider's status and error name only: never the brief, the
  // visitor's address or the credential.
  let name = "unknown";
  try {
    const detail = (await response.json()) as { name?: unknown };
    if (typeof detail.name === "string") name = detail.name;
  } catch {
    // Non-JSON error body; status alone is enough.
  }
  console.error("contact: provider rejected", response.status, name);
  return reply(503, "unavailable");
}
