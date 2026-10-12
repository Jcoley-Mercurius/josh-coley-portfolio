import { expect, test } from "@playwright/test";

// S6c: the footer follows the Mercurius Marketplace pattern (brand block,
// link columns, bottom bar) and only links to content the site has.

const footer = (page: import("@playwright/test").Page) => page.getByRole("contentinfo");

test("footer lists the brand block, three columns and the bottom bar", async ({ page }) => {
  await page.goto("/");
  const root = footer(page);
  await expect(root.getByRole("link", { name: "Mercurius Solutions home" })).toHaveAttribute("href", "/");
  await expect(root.getByRole("link", { name: "Discuss a project" })).toHaveAttribute("href", "/#contact");

  const work = root.getByRole("navigation", { name: "Case studies" }).getByRole("link");
  await expect(work).toHaveCount(5);
  for (const href of await work.evaluateAll((links) => links.map((a) => a.getAttribute("href")))) {
    expect(href).toMatch(/^\/work\/[a-z0-9-]+$/);
  }

  await expect(root.getByRole("navigation", { name: "What we build" }).getByRole("link")).toHaveText([
    "Business websites",
    "Booking experiences",
    "SaaS & portals",
    "Marketplaces",
  ]);
  await expect(root.getByRole("navigation", { name: "Studio" }).getByRole("link")).toHaveText([
    "Selected work",
    "What we build",
    "Approach",
    "About",
    "Start a project",
  ]);

  await expect(root).toContainText(`© ${new Date().getFullYear()} Mercurius Solutions. All rights reserved.`);
  await expect(root.getByRole("switch")).toHaveCount(0);
});

test("every footer link resolves", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await footer(page)
    .getByRole("link")
    .evaluateAll((links) => [...new Set(links.map((a) => a.getAttribute("href")!))]);
  for (const href of hrefs) {
    const [path, hash] = href.split("#");
    expect((await request.get(path || "/")).status(), href).toBe(200);
    if (hash) expect(await page.locator(`#${hash}`).count(), href).toBe(1);
  }
});

test("a footer service link preselects the inquiry type", async ({ page }) => {
  await page.goto("/");
  await footer(page).getByRole("link", { name: "Booking experiences" }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("#inquiry-service")).toHaveValue("booking");
});

test("footer reflows without horizontal scroll and renders on case studies", async ({ page }) => {
  for (const width of [360, 390, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/work/vertex");
    await expect(footer(page).getByRole("navigation", { name: "Case studies" })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `${width}px`).toBeLessThanOrEqual(0);
  }
});
