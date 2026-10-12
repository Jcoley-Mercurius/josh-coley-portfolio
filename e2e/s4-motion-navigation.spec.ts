import { expect, test, type Locator, type Page } from "@playwright/test";

const heroAlt =
  "Marble Hermes sculpture on a luminous Greek terrace overlooking the sea";
const DEPTH_MAX = 32; // mds/tokens.json motion.heroDepthMaxPx

const heroArt = (page: Page) => page.getByRole("img", { name: heroAlt });
const heroCopy = (page: Page) => page.locator(".a1-reveal");
const menuButton = (page: Page) => page.getByRole("button", { name: "Menu" });
const nav = (page: Page) => page.locator("#primary-navigation");

// Vertical translation of the hero image, from its computed transform.
async function depth(page: Page) {
  return heroArt(page).evaluate((img) => {
    const transform = getComputedStyle(img).transform;
    if (transform === "none") return 0;
    return new DOMMatrixReadOnly(transform).m42;
  });
}

async function scrollTo(page: Page, top: number) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), top);
}

async function noHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
}

async function lift(card: Locator) {
  return card.evaluate((el) => {
    const transform = getComputedStyle(el).transform;
    return transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m42;
  });
}

test.describe("hero depth", () => {
  test("follows scroll on desktop, capped, without a gap above the art", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    expect(await depth(page)).toBe(0);

    await scrollTo(page, 200);
    await expect.poll(() => depth(page)).toBe(12); // 200 × 0.06

    await scrollTo(page, 2000);
    await expect.poll(() => depth(page)).toBe(DEPTH_MAX);
    // At full depth the image's top edge is still at or above the hero's top.
    const gap = await heroArt(page).evaluate((img) => {
      const frame = img.closest(".hero-art")!.getBoundingClientRect();
      return img.getBoundingClientRect().top - frame.top;
    });
    expect(gap).toBeLessThanOrEqual(0.5);

    await scrollTo(page, 0);
    await expect.poll(() => depth(page)).toBe(0);
    expect(errors).toEqual([]);
  });

  for (const width of [768, 390]) {
    test(`stays still at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await scrollTo(page, 300);
      await page.waitForTimeout(200);
      expect(await depth(page)).toBe(0);
    });
  }

  test("starts when the window widens to desktop", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    await page.goto("/");
    await page.setViewportSize({ width: 1280, height: 900 });
    await scrollTo(page, 100);
    await expect.poll(() => depth(page)).toBe(6);
  });

  test("detaches on other pages and resumes on return", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.getByRole("link", { name: "Explore case study: Vertex" }).click();
    await expect(page).toHaveURL(/\/work\/vertex$/);
    await scrollTo(page, 400);
    await page.goBack();
    await expect(heroArt(page)).toBeVisible();
    // Next restores the earlier scroll position after back; keep re-scrolling
    // until that settles.
    await expect
      .poll(async () => {
        await scrollTo(page, 150);
        return depth(page);
      })
      .toBe(9);
    expect(errors).toEqual([]);
  });
});

test.describe("entrance and card motion", () => {
  test("hero copy enters with the token duration", async ({ page }) => {
    await page.goto("/");
    const animation = await heroCopy(page).evaluate((el) => {
      const style = getComputedStyle(el);
      return `${style.animationName} ${style.animationDuration}`;
    });
    expect(animation).toBe("a1-enter 0.65s");
  });

  test("cards lift on hover and on keyboard focus", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const cards = page.locator(".project-card");
    const first = cards.first();
    expect(
      await first.evaluate((el) => getComputedStyle(el).transitionDuration),
    ).toBe("0.3s, 0.3s");

    await first.hover();
    await expect.poll(() => lift(first)).toBe(-5);

    await page.mouse.move(0, 0);
    const second = cards.nth(1);
    await second.getByRole("link").focus();
    await expect.poll(() => lift(second)).toBe(-5);
    await expect.poll(() => lift(first)).toBe(0);
  });
});

test.describe("motion preference", () => {
  // Owner decision 2026-10-12: the footer switch is gone; the system
  // preference is the only control.
  test("there is no manual motion switch", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("switch")).toHaveCount(0);
  });

  test("the system preference stops depth and entrance motion", async ({ browser }) => {
    const context = await browser.newContext({
      reducedMotion: "reduce",
      viewport: { width: 1280, height: 900 },
    });
    const page = await context.newPage();
    await page.goto("/");
    await scrollTo(page, 300);
    await page.waitForTimeout(200);
    expect(await depth(page)).toBe(0);
    expect(await heroCopy(page).evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
    expect(
      await page.locator(".project-card").first().evaluate((el) => getComputedStyle(el).transitionDuration),
    ).toBe("0s");
    await context.close();
  });
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("closes on a click outside", async ({ page }) => {
    await page.goto("/");
    await menuButton(page).click();
    await expect(nav(page)).toBeVisible();
    // Below the open panel (which covers the hero heading).
    await page.mouse.click(195, 800);
    await expect(nav(page)).toBeHidden();
    await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");
  });

  test("closes when focus leaves it", async ({ page }) => {
    await page.goto("/");
    await menuButton(page).click();
    await menuButton(page).focus();
    for (const name of ["Work", "Services", "Approach", "About", "Discuss a project"]) {
      await page.keyboard.press("Tab");
      await expect(nav(page).getByRole("link", { name })).toBeFocused();
    }
    await page.keyboard.press("Tab");
    await expect(nav(page)).toBeHidden();
  });

  test("closes on browser back within the page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Explore the work" }).click();
    await expect(page).toHaveURL(/#work$/);
    await menuButton(page).click();
    await expect(nav(page)).toBeVisible();
    await page.goBack();
    await expect(nav(page)).toBeHidden();
  });

  test("closes on a route change", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Explore case study: Vertex" }).click();
    await expect(page).toHaveURL(/\/work\/vertex$/);
    await menuButton(page).click();
    await expect(nav(page)).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expect(nav(page)).toBeHidden();
    await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");
  });

  test("shows plain links without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto("/");
    await expect(menuButton(page)).toBeHidden();
    for (const name of ["Work", "Services", "Approach", "About"]) {
      await expect(nav(page).getByRole("link", { name })).toBeVisible();
    }
    await noHorizontalOverflow(page);
    await nav(page).getByRole("link", { name: "Services" }).click();
    await expect(page).toHaveURL(/#services$/);
    await context.close();
  });
});
