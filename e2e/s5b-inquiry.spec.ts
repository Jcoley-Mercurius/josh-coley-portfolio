import { expect, test, type Page, type Route } from "@playwright/test";

// S5b: project inquiry through /api/contact (Resend). Client states are driven
// by intercepting /api/contact; the last tests hit the real endpoint, which
// reports "unavailable" because the test server has no Resend configuration.

const brief = "We need a booking site for a two-chair barbershop.";

async function fill(page: Page, overrides: Partial<Record<string, string>> = {}) {
  const values = { name: "Ada Lovelace", email: "ada@example.org", message: brief, ...overrides };
  const form = page.locator("#contact form");
  await form.getByLabel("Name").fill(values.name);
  await form.getByLabel("Email").fill(values.email);
  await form.getByLabel("Project brief").fill(values.message);
}

const submit = (page: Page) =>
  page.locator("#contact").getByRole("button", { name: /send project brief/i });
const status = (page: Page) => page.locator("#contact [role=status]");

async function openContact(page: Page) {
  await page.goto("/#contact");
  await expect(submit(page)).toBeEnabled();
}

function respond(status: number, body: object = {}) {
  return (route: Route) =>
    route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
}

test("contact section, form and nav link render; no legacy integration", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("web3forms")) external.push(request.url());
  });
  await page.goto("/");
  const contact = page.locator("#contact");
  await expect(contact.getByRole("heading", { name: "What would you like to build?" })).toBeVisible();
  await expect(contact.locator("form")).toHaveCount(1);
  await expect(page.getByRole("link", { name: /discuss a project/i })).toHaveAttribute(
    "href",
    "/#contact",
  );
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  expect(external).toEqual([]);
});

test("server HTML carries the form but no credential or legacy reference", async ({ request }) => {
  const html = await (await request.get("/")).text();
  expect(html).toContain('id="contact"');
  expect(html).toContain('action="/api/contact"');
  for (const path of ["/", "/work/vertex"]) {
    const page = await (await request.get(path)).text();
    expect(page).not.toMatch(/web3forms|access_key|RESEND_API_KEY|re_[A-Za-z0-9]{8,}/i);
  }
});

test("client bundles carry no credential or recipient configuration", async ({ page, request }) => {
  await page.goto("/");
  const scripts = await page
    .locator("script[src]")
    .evaluateAll((nodes) => nodes.map((node) => (node as HTMLScriptElement).src));
  expect(scripts.length).toBeGreaterThan(0);
  for (const src of scripts) {
    const js = await (await request.get(src)).text();
    expect(js).not.toMatch(/RESEND_API_KEY|CONTACT_TO_EMAIL|CONTACT_FROM_EMAIL|api\.resend\.com/);
  }
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("form is readable, cannot submit, and explains why", async ({ page }) => {
    await page.goto("/#contact");
    await expect(page.locator("#contact form").getByLabel("Project brief")).toBeVisible();
    await expect(submit(page)).toBeDisabled();
    await expect(page.getByText("The inquiry form needs JavaScript to send.")).toBeVisible();
  });
});

test("invalid input shows field errors, focuses the first and sends nothing", async ({ page }) => {
  let requests = 0;
  await page.route("**/api/contact", (route) => {
    requests++;
    return respond(202, { outcome: "accepted" })(route);
  });
  await openContact(page);
  await page.locator("#contact form").getByLabel("Email").fill("not-an-email");
  await submit(page).click();

  await expect(status(page)).toHaveText("Check the highlighted fields.");
  const name = page.locator("#contact form").getByLabel("Name");
  await expect(name).toBeFocused();
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#name-error")).toHaveText("Enter your name.");
  await expect(page.locator("#email-error")).toBeVisible();
  await expect(page.locator("#message-error")).toBeVisible();

  // Fixing a field clears its error.
  await name.fill("Ada");
  await expect(page.locator("#name-error")).toHaveCount(0);
  expect(requests).toBe(0);
});

test("accepted: posts JSON with an idempotency key, then clears the form", async ({ page }) => {
  const sent: { headers: Record<string, string>; body: Record<string, string> }[] = [];
  await page.route("**/api/contact", (route) => {
    sent.push({ headers: route.request().headers(), body: route.request().postDataJSON() });
    return respond(202, { outcome: "accepted" })(route);
  });
  await openContact(page);
  await fill(page);
  await page.locator("#contact form").getByLabel(/project type/i).selectOption("booking");
  await submit(page).click();

  await expect(status(page)).toHaveText(/accepted for delivery/);
  await expect(status(page)).not.toHaveText(/delivered|within/i);
  expect(sent).toHaveLength(1);
  expect(sent[0].headers["content-type"]).toBe("application/json");
  expect(sent[0].headers["idempotency-key"]).toMatch(/^[0-9a-f-]{36}$/);
  expect(sent[0].body).toEqual({
    name: "Ada Lovelace",
    email: "ada@example.org",
    service: "booking",
    message: brief,
    website: "",
  });
  await expect(page.locator("#contact form").getByLabel("Project brief")).toHaveValue("");
});

test("double submission sends one request and disables the button", async ({ page }) => {
  let requests = 0;
  let release!: () => void;
  const held = new Promise<void>((resolve) => (release = resolve));
  await page.route("**/api/contact", async (route) => {
    requests++;
    await held;
    await respond(202, { outcome: "accepted" })(route);
  });
  await openContact(page);
  await fill(page);
  await submit(page).click();
  const sending = page.locator("#contact").getByRole("button", { name: "Sending…" });
  await expect(sending).toBeDisabled();
  await expect(status(page)).toHaveText("Sending your brief…");
  await page.locator("#contact form").evaluate((form: HTMLFormElement) => form.requestSubmit());
  release();
  await expect(status(page)).toHaveText(/accepted for delivery/);
  expect(requests).toBe(1);
});

test("unavailable keeps input; retry reuses the key; edits get a new key", async ({ page }) => {
  const keys: string[] = [];
  const replies = [503, 503, 202];
  await page.route("**/api/contact", (route) => {
    keys.push(route.request().headers()["idempotency-key"]);
    const code = replies.shift()!;
    return respond(code, { outcome: code === 202 ? "accepted" : "unavailable" })(route);
  });
  await openContact(page);
  await fill(page);

  await submit(page).click();
  await expect(status(page)).toHaveText(/unavailable right now/);
  await expect(page.locator("#contact form").getByLabel("Project brief")).toHaveValue(brief);

  await submit(page).click();
  await expect(status(page)).toHaveText(/unavailable right now/);
  expect(keys[1]).toBe(keys[0]);

  await page.locator("#contact form").getByLabel("Project brief").fill(`${brief} Revised.`);
  await submit(page).click();
  await expect(status(page)).toHaveText(/accepted for delivery/);
  expect(keys[2]).not.toBe(keys[0]);
});

test("network failure reports unavailable and keeps input", async ({ page }) => {
  await page.route("**/api/contact", (route) => route.abort("failed"));
  await openContact(page);
  await fill(page);
  await submit(page).click();
  await expect(status(page)).toHaveText(/unavailable right now/);
  await expect(page.locator("#contact form").getByLabel("Name")).toHaveValue("Ada Lovelace");
});

test("rate-limited (firewall 429) keeps input", async ({ page }) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({ status: 429, contentType: "text/plain", body: "Too Many Requests" }),
  );
  await openContact(page);
  await fill(page);
  await submit(page).click();
  await expect(status(page)).toHaveText(/Too many requests/);
  await expect(page.locator("#contact form").getByLabel("Project brief")).toHaveValue(brief);
});

test("server field errors are shown against their fields", async ({ page }) => {
  await page.route(
    "**/api/contact",
    respond(400, { outcome: "invalid", errors: { email: "Enter an email address like name@example.com." } }),
  );
  await openContact(page);
  await fill(page);
  await submit(page).click();
  await expect(status(page)).toHaveText("Check the highlighted fields.");
  await expect(page.locator("#email-error")).toBeVisible();
  await expect(page.locator("#contact form").getByLabel("Email")).toBeFocused();
});

test("honeypot is hidden and unreachable by keyboard", async ({ page }) => {
  await openContact(page);
  const trap = page.locator('#contact input[name="website"]');
  await expect(trap).toHaveAttribute("tabindex", "-1");
  await expect(trap).not.toBeInViewport();
  await expect(page.locator(".inquiry-trap")).toHaveAttribute("aria-hidden", "true");
});

test("mobile: form fits without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await openContact(page);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
  await submit(page).scrollIntoViewIfNeeded();
  await expect(submit(page)).toBeInViewport();
  const box = await page.locator("#contact form").getByLabel("Project brief").boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(360);
});

test("real endpoint without configuration reports unavailable", async ({ page }) => {
  await openContact(page);
  await fill(page);
  await submit(page).click();
  await expect(status(page)).toHaveText(/unavailable right now/);
});

test("endpoint refuses GET, cross-origin and form-encoded posts", async ({ request, baseURL }) => {
  expect((await request.get("/api/contact")).status()).toBe(405);
  const headers = { "idempotency-key": "3f2b8c1e-5d4a-4c8b-9e7f-0a1b2c3d4e5f" };
  const cross = await request.post("/api/contact", {
    headers: { ...headers, origin: "https://evil.example" },
    data: { name: "A", email: "a@b.co", service: "", message: brief, website: "" },
  });
  expect(cross.status()).toBe(403);
  const encoded = await request.post("/api/contact", {
    headers: { ...headers, origin: baseURL! },
    form: { name: "A" },
  });
  expect(encoded.status()).toBe(415);
});
