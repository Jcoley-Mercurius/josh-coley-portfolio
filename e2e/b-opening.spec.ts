import { expect, test } from "@playwright/test";

// MDS-06, MDS-PORTFOLIO-2026-10-14-B-OPENING: owner-selected hero values.
const hero = "section[aria-labelledby='hero-title']";

const cases = [
  // width, hero height, h1 font-size, h1 line-height, art block height
  { width: 360, heroHeight: null, fontSize: 46, lineHeight: 1.06, artHeight: 220 },
  { width: 768, heroHeight: 560, fontSize: 52.224, lineHeight: 1.04, artHeight: null },
  { width: 1440, heroHeight: 600, fontSize: 80, lineHeight: 1.04, artHeight: null },
] as const;

for (const c of cases) {
  test(`B opening values at ${c.width}px`, async ({ page }) => {
    await page.setViewportSize({ width: c.width, height: 900 });
    await page.goto("/");
    const section = page.locator(hero);
    await expect(section.locator(".eyebrow")).toHaveText("Web & product development");

    const m = await section.evaluate((el) => {
      const h1 = getComputedStyle(el.querySelector("#hero-title")!);
      return {
        height: el.getBoundingClientRect().height,
        fontSize: parseFloat(h1.fontSize),
        lineHeight: parseFloat(h1.lineHeight) / parseFloat(h1.fontSize),
        art: el.querySelector(".hero-art")!.getBoundingClientRect().height,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });
    if (c.heroHeight) expect(Math.round(m.height)).toBe(c.heroHeight);
    expect(m.fontSize).toBeCloseTo(c.fontSize, 1);
    expect(m.lineHeight).toBeCloseTo(c.lineHeight, 2);
    if (c.artHeight) expect(Math.round(m.art)).toBe(c.artHeight);
    expect(m.overflow).toBeLessThanOrEqual(0);
  });
}

test("hero grows past 600px on wide screens to keep the statue framed", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");
  const height = await page.locator(hero).evaluate((el) => el.getBoundingClientRect().height);
  expect(Math.round(height)).toBe(800);
});

test("heading keeps its words and breaks only before 'working products.'", async ({ page }) => {
  await page.goto("/");
  const title = page.locator("#hero-title");
  await expect(title).toHaveText("Ideas shaped into working products.");
  await expect(title.locator("br")).toHaveCount(0);
  await expect(title.locator(".hero-last")).toHaveCSS("display", "block");
});
