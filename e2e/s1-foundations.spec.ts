import { expect, test, type Page } from "@playwright/test";

// QA reference widths from mds/REFERENCE-INDEX.md.
const widths = [360, 390, 768, 1280, 1440];
const heroTitle = /Ideas shaped\s*into working\s*products\./;
const heroAlt =
  "Marble Hermes sculpture on a luminous Greek terrace overlooking the sea";

async function noHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
}

test.describe("hero composition", () => {
  for (const width of widths) {
    test(`at ${width}px`, async ({ page }, testInfo) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");

      const title = page.getByRole("heading", { level: 1, name: heroTitle });
      const art = page.getByRole("img", { name: heroAlt });
      await expect(title).toBeVisible();
      await expect(art).toBeVisible();
      await expect
        .poll(() => art.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth))
        .toBeGreaterThan(0);

      const titleBox = (await title.boundingBox())!;
      const artBox = (await art.boundingBox())!;
      if (width <= 650) {
        // MDS-02: artwork sits below the copy on mobile.
        const cta = (await page.getByRole("link", { name: "View services" }).boundingBox())!;
        expect(artBox.y).toBeGreaterThanOrEqual(cta.y + cta.height);
      } else {
        // MDS-02: readable copy left, full-bleed sculpture behind and to the right.
        expect(titleBox.x + titleBox.width).toBeLessThanOrEqual(width * 0.68);
        expect(artBox.width).toBeGreaterThanOrEqual(width);
      }

      await noHorizontalOverflow(page);
      expect(errors).toEqual([]);
      await page.screenshot({
        path: testInfo.outputPath(`hero-${width}.png`),
        fullPage: false,
      });
    });
  }
});

test("hero copy and navigation are server-rendered without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: heroTitle })).toBeVisible();
  await expect(page.getByRole("img", { name: heroAlt })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await context.close();
});

test("site metadata reflects the Mercurius brand", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Mercurius Solutions · Web and product development");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Websites, booking experiences, SaaS portals, and marketplaces/,
  );
});

test("skip link reaches main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main")).toBeFocused();
});

test("focused controls show the bronze focus ring", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab"); // skip link
  await page.keyboard.press("Tab"); // brand
  const brand = page.getByRole("link", { name: "Mercurius Solutions home" });
  await expect(brand).toBeFocused();
  const outline = await brand.evaluate((el) => {
    const style = getComputedStyle(el);
    return `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor}`;
  });
  expect(outline).toBe("solid 3px rgb(115, 83, 46)");
});

test.describe("navigation", () => {
  test("desktop shows links and hides the menu button", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Menu" })).toBeHidden();
    const nav = page.getByRole("navigation", { name: "Primary" });
    for (const name of ["Work", "Services", "About", "Discuss a project"]) {
      await expect(nav.getByRole("link", { name })).toBeVisible();
    }
    await nav.getByRole("link", { name: "Services" }).click();
    await expect(page).toHaveURL(/#services$/);
    await expect(page.locator("#services")).toBeInViewport();
  });

  test("mobile menu opens, closes on Escape and returns focus", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const button = page.getByRole("button", { name: "Menu" });
    const nav = page.locator("#primary-navigation");
    await expect(nav).toBeHidden();
    await expect(button).toHaveAttribute("aria-expanded", "false");

    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(nav.getByRole("link", { name: "Work" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(nav).toBeHidden();
    await expect(button).toBeFocused();

    await button.click();
    await nav.getByRole("link", { name: "About" }).click();
    await expect(nav).toBeHidden();
    await expect(page).toHaveURL(/#about$/);
    await noHorizontalOverflow(page);
  });

  test("mobile menu closes when the viewport widens", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const button = page.getByRole("button", { name: "Menu" });
    await button.click();
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(button).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("motion preference", () => {
  test("hero depth transform is present by default", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const transform = await page
      .getByRole("img", { name: heroAlt })
      .evaluate((img) => getComputedStyle(img).transform);
    expect(transform).toBe("matrix(1.04, 0, 0, 1.04, 0, 0)");
  });

  test("reduced motion removes the hero transform", async ({ browser }) => {
    const context = await browser.newContext({
      reducedMotion: "reduce",
      viewport: { width: 1280, height: 900 },
    });
    const page = await context.newPage();
    await page.goto("/");
    const transform = await page
      .getByRole("img", { name: heroAlt })
      .evaluate((img) => getComputedStyle(img).transform);
    expect(transform).toBe("none");
    await context.close();
  });
});

test("hero stays readable when the artwork fails to load", async ({ page }, testInfo) => {
  await page.route("**/_next/image**", (route) => route.abort());
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: heroTitle })).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore the work" })).toBeVisible();
  const background = await page
    .locator("section[aria-labelledby='hero-title']")
    .evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(background).toBe("rgb(238, 230, 215)");
  await page.screenshot({ path: testInfo.outputPath("hero-image-failure.png") });
});

// The statue spans roughly 7%–83% of the artwork's height and 64%–82% of its
// width. Cover-cropping must never cut the head, and should keep the figure
// visible at least to the hips.
test.describe("hero keeps the statue in frame", () => {
  const viewports = [
    [360, 800],
    [600, 900],
    [768, 1024],
    [1024, 768],
    [1280, 800],
    [1440, 900],
    [1920, 1080],
    [2560, 1440],
  ] as const;

  for (const [width, height] of viewports) {
    test(`at ${width}×${height}`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height });
      await page.goto("/");
      const art = page.getByRole("img", { name: heroAlt });
      await expect
        .poll(() => art.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth))
        .toBeGreaterThan(0);

      const visible = await art.evaluate((img: HTMLImageElement) => {
        const frame = img.parentElement!.getBoundingClientRect();
        const box = img.getBoundingClientRect(); // includes the scale transform
        const scale = Math.max(box.width / img.naturalWidth, box.height / img.naturalHeight);
        const drawnW = img.naturalWidth * scale;
        const drawnH = img.naturalHeight * scale;
        const [posX, posY] = getComputedStyle(img)
          .objectPosition.split(" ")
          .map((v) => parseFloat(v) / 100);
        const left = box.left + (box.width - drawnW) * posX;
        const top = box.top + (box.height - drawnH) * posY;
        return {
          top: (frame.top - top) / drawnH,
          bottom: (frame.bottom - top) / drawnH,
          left: (frame.left - left) / drawnW,
          right: (frame.right - left) / drawnW,
        };
      });

      expect(visible.top).toBeLessThanOrEqual(0.05);
      expect(visible.bottom).toBeGreaterThanOrEqual(0.6);
      expect(visible.left).toBeLessThanOrEqual(0.64);
      expect(visible.right).toBeGreaterThanOrEqual(0.82);
      await page.screenshot({ path: testInfo.outputPath(`statue-${width}.png`) });
    });
  }
});
