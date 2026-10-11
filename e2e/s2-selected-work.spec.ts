import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";

// Display order follows app/_lib/project-records.ts (prototype order); names,
// categories and statuses come from content/projects/.
const order = ["shave-parlor", "homeschool-haven", "marketplace", "vertex", "supabase-saas"];
const projects: { name: string; category: string; status: string; screenshots: unknown[] }[] =
  order.map((id) => JSON.parse(readFileSync(join("content/projects", `${id}.json`), "utf8")));
const filters = ["All", "Websites", "Booking", "SaaS", "Marketplaces"];

const work = (page: Page) => page.locator("section#work");
const cards = (page: Page) => work(page).getByRole("article");
const cardTitles = (page: Page) => work(page).getByRole("heading", { level: 3 });

async function noHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
}

test("project cards are server-rendered and readable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(work(page).getByRole("heading", { level: 2, name: "Selected work" })).toBeVisible();
  await expect(cardTitles(page)).toHaveText(projects.map((p) => p.name));
  for (const project of projects) {
    const card = cards(page).filter({ hasText: project.name });
    await expect(card).toContainText(project.status);
    await expect(card).toContainText(project.category);
    if (project.screenshots.length === 0) {
      await expect(card).toContainText("Project screenshot pending");
    } else {
      await expect(card.locator("img")).toHaveCount(1);
    }
  }
  await expect(work(page).getByText("5 projects shown")).toBeVisible();
  // Filters cannot work without JavaScript, so they are not offered.
  await expect(work(page).getByRole("button", { name: "SaaS" })).toBeHidden();
  await context.close();
});

test.describe("filters", () => {
  test("show matching projects with counts and pressed state", async ({ page }) => {
    await page.goto("/#work");
    const group = page.getByRole("group", { name: "Filter projects" });
    await expect(group.getByRole("button")).toHaveText(filters);
    const status = work(page).getByRole("status");
    await expect(status).toHaveText("5 projects shown");
    await expect(group.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");

    for (const filter of [...filters.slice(1), "All"]) {
      const button = group.getByRole("button", { name: filter });
      await button.click();
      const expected = projects.filter((p) => filter === "All" || p.category === filter);
      await expect(cardTitles(page)).toHaveText(expected.map((p) => p.name));
      await expect(status).toHaveText(
        `${expected.length} ${expected.length === 1 ? "project" : "projects"} shown`,
      );
      for (const other of filters) {
        await expect(group.getByRole("button", { name: other, exact: true })).toHaveAttribute(
          "aria-pressed",
          String(other === filter),
        );
      }
    }
  });

  test("work with the keyboard and keep focus on the control", async ({ page }) => {
    await page.goto("/#work");
    const group = page.getByRole("group", { name: "Filter projects" });
    await group.getByRole("button", { name: "All" }).focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    const saas = group.getByRole("button", { name: "SaaS" });
    await expect(saas).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(saas).toHaveAttribute("aria-pressed", "true");
    await expect(saas).toBeFocused();
    await expect(cardTitles(page)).toHaveCount(2);

    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Space");
    await expect(group.getByRole("button", { name: "Booking" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(cardTitles(page)).toHaveText(["The Shave Parlor"]);

    const outline = await group
      .getByRole("button", { name: "Booking" })
      .evaluate((el) => {
        const style = getComputedStyle(el);
        return `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor}`;
      });
    expect(outline).toBe("solid 3px rgb(115, 83, 46)");
  });

  test("pressed filter uses the A1 ink fill", async ({ page }) => {
    await page.goto("/#work");
    const all = page.getByRole("group", { name: "Filter projects" }).getByRole("button", {
      name: "All",
    });
    const style = await all.evaluate((el) => {
      const s = getComputedStyle(el);
      return [s.backgroundColor, s.color, s.borderRadius];
    });
    expect(style).toEqual(["rgb(32, 39, 31)", "rgb(255, 255, 255)", "30px"]);
  });
});

test.describe("selected work layout", () => {
  const columns: Record<number, number> = { 360: 1, 390: 1, 768: 2, 1280: 3, 1440: 3 };

  for (const [width, expected] of Object.entries(columns)) {
    test(`at ${width}px shows ${expected} column(s)`, async ({ page }, testInfo) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.setViewportSize({ width: Number(width), height: 900 });
      await page.goto("/#work");
      await expect(cards(page)).toHaveCount(5);
      const lefts = await cards(page).evaluateAll((els) =>
        els.map((el) => Math.round(el.getBoundingClientRect().left)),
      );
      expect(new Set(lefts).size).toBe(expected);
      await noHorizontalOverflow(page);
      expect(errors).toEqual([]);
      await work(page).screenshot({ path: testInfo.outputPath(`work-${width}.png`) });
    });
  }
});

test("hero CTA leads to the selected work", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.getByRole("link", { name: "Explore the work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(work(page).getByRole("heading", { level: 2 })).toBeInViewport();
});

test("legacy work claims are no longer published", async ({ page }) => {
  await page.goto("/");
  for (const text of ["Smart Quote Tool", "Vendor Application Portal", "Visit Site"]) {
    await expect(page.getByText(text)).toHaveCount(0);
  }
});
