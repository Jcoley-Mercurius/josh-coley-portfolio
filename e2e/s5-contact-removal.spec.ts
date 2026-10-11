import { expect, test } from "@playwright/test";

// S5 (revised): the legacy Web3Forms contact form is removed until the Resend
// inquiry slice. Nothing on the site should point at or post to it.

test("home has no contact section, form or contact links", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("web3forms")) external.push(request.url());
  });
  await page.goto("/");
  await expect(page.locator("#services")).toBeAttached();
  await expect(page.locator("#contact")).toHaveCount(0);
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.locator('a[href*="#contact"]')).toHaveCount(0);
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  expect(external).toEqual([]);
});

test("server HTML carries no Web3Forms reference", async ({ request }) => {
  for (const path of ["/", "/work/vertex"]) {
    const html = await (await request.get(path)).text();
    expect(html).not.toMatch(/web3forms|access_key/i);
  }
});
