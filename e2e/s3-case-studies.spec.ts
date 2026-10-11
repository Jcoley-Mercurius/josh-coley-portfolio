import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";

interface Record {
  id: string;
  name: string;
  category: string;
  type: string;
  summary: string;
  challenge: string;
  decisions: string[];
  detail: string;
  status: string;
}

// Display order follows app/_lib/project-records.ts (prototype order).
const order = ["shave-parlor", "homeschool-haven", "marketplace", "vertex", "supabase-saas"];
const projects: Record[] = order.map((id) =>
  JSON.parse(readFileSync(join("content/projects", `${id}.json`), "utf8")),
);
const nextOf = (index: number) => projects[(index + 1) % projects.length];
const chapters = [
  { label: "Challenge", id: "challenge", heading: "The challenge" },
  { label: "Contribution", id: "contribution", heading: "My contribution" },
  { label: "Decisions", id: "decisions", heading: "Key decisions" },
  { label: "Evidence", id: "evidence", heading: "Working evidence" },
];

const title = (page: Page) => page.getByRole("heading", { level: 1 });
const chapterNav = (page: Page) => page.getByRole("navigation", { name: "Case-study chapters" });

async function noHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
}

test("every case study is server-rendered and readable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const [index, project] of projects.entries()) {
    const response = await page.goto(`/work/${project.id}`);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(`${project.name} · Mercurius Solutions`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      project.summary,
    );
    await expect(title(page)).toHaveText(project.name);
    await expect(page.getByText(`Case study · ${project.category}`)).toBeVisible();
    await expect(page.getByText(project.summary)).toBeVisible();

    const facts = page.locator("dl");
    await expect(facts.locator("dt")).toHaveText(["Project type", "Status", "Evidence"]);
    await expect(facts.locator("dd")).toHaveText([project.type, project.status, "Review pending"]);

    await expect(chapterNav(page).getByRole("link")).toHaveText(chapters.map((c) => c.label));
    for (const chapter of chapters) {
      await expect(
        page.locator(`#${chapter.id}`).getByRole("heading", { level: 2, name: chapter.heading }),
      ).toBeVisible();
    }
    await expect(page.locator("#challenge")).toContainText(project.challenge);
    await expect(page.locator("#contribution")).toContainText(
      "Scope, role, and delivery evidence to verify before publication.",
    );
    await expect(page.locator("#decisions")).toContainText(project.detail);
    await expect(page.locator("#decisions").getByRole("heading", { level: 3 })).toHaveText(
      project.decisions,
    );
    await expect(page.getByText("Verified project screenshot pending")).toBeVisible();
    await expect(page.locator("#evidence")).toContainText("Verification pending. No results claimed.");

    await expect(page.getByRole("link", { name: "Back to work" })).toHaveAttribute("href", "/#work");
    const next = nextOf(index);
    await expect(page.getByRole("link", { name: `Next project · ${next.name}` })).toHaveAttribute(
      "href",
      `/work/${next.id}`,
    );
  }
  await context.close();
});

test("cards link to their case studies and focus moves to the title", async ({ page }) => {
  await page.goto("/#work");
  for (const project of projects) {
    await expect(
      page.getByRole("link", { name: `Explore case study: ${project.name}` }),
    ).toHaveAttribute("href", `/work/${project.id}`);
  }
  await page.getByRole("link", { name: "Explore case study: Vertex" }).click();
  await expect(page).toHaveURL(/\/work\/vertex$/);
  await expect(page).toHaveTitle("Vertex · Mercurius Solutions");
  await expect(title(page)).toHaveText("Vertex");
  await expect(title(page)).toBeFocused();
});

test("next project visits every case study in order and wraps", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`/work/${projects[0].id}`);
  for (const [index] of projects.entries()) {
    const next = nextOf(index);
    // The link ends the page: scroll there first (instantly, so no smooth
    // scroll is still running), then activate it with the keyboard.
    await page.evaluate(() =>
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }),
    );
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    await page.getByRole("link", { name: `Next project · ${next.name}` }).focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`/work/${next.id}$`));
    await expect(page).toHaveTitle(`${next.name} · Mercurius Solutions`);
    await expect(title(page)).toHaveText(next.name);
    await expect(title(page)).toBeFocused();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  }
  expect(errors).toEqual([]);
});

test("back to work returns to selected work, and browser history works", async ({ page }) => {
  await page.goto("/work/marketplace");
  await page.getByRole("link", { name: "Back to work" }).click();
  await expect(page).toHaveURL(/\/#work$/);
  await expect(page.getByRole("heading", { level: 2, name: "Selected work" })).toBeInViewport();

  await page.goBack();
  await expect(page).toHaveURL(/\/work\/marketplace$/);
  await expect(title(page)).toHaveText("Mercurius Marketplace");
  await page.goForward();
  await expect(page).toHaveURL(/\/#work$/);
  await expect(page.getByRole("heading", { level: 2, name: "Selected work" })).toBeVisible();
});

test.describe("chapters", () => {
  for (const javaScriptEnabled of [true, false]) {
    test(`direct chapter links land below the header (JavaScript ${javaScriptEnabled ? "on" : "off"})`, async ({
      browser,
    }) => {
      const context = await browser.newContext({ javaScriptEnabled });
      const page = await context.newPage();
      for (const chapter of chapters) {
        await page.goto(`/work/vertex#${chapter.id}`);
        const heading = page.locator(`#${chapter.id} h2`);
        await expect(heading).toBeInViewport();
        const headerBottom = await page
          .locator("header")
          .evaluate((el) => el.getBoundingClientRect().bottom);
        const headingTop = await heading.evaluate((el) => el.getBoundingClientRect().top);
        expect(headingTop).toBeGreaterThanOrEqual(headerBottom);
      }
      await context.close();
    });
  }

  test("chapter navigation works with the keyboard", async ({ page }) => {
    await page.goto("/work/shave-parlor");
    const link = chapterNav(page).getByRole("link", { name: "Evidence" });
    await link.focus();
    await expect(link).toHaveCSS("outline-width", "3px");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/work\/shave-parlor#evidence$/);
    await expect(page.locator("#evidence h2")).toBeInViewport();
  });
});

test.describe("unknown project links", () => {
  for (const path of ["/work/not-a-project", "/work/Vertex", "/work", "/work/vertex/extra"]) {
    test(`${path} returns a readable 404`, async ({ browser }) => {
      // Without JavaScript, to prove the not-found state is in the server HTML.
      const context = await browser.newContext({ javaScriptEnabled: false });
      const page = await context.newPage();
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
      await expect(page).toHaveTitle("Page not found · Mercurius Solutions");
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
      await expect(title(page)).toHaveText("Page not found");
      await expect(page.getByText("This page or case-study link is unavailable.")).toBeVisible();
      await expect(page.getByRole("link", { name: "Return to selected work" })).toHaveAttribute(
        "href",
        "/#work",
      );
      await context.close();
    });
  }

  test("return to selected work recovers", async ({ page }) => {
    await page.goto("/work/not-a-project");
    await page.getByRole("link", { name: "Return to selected work" }).click();
    await expect(page).toHaveURL(/\/#work$/);
    await expect(page.getByRole("heading", { level: 2, name: "Selected work" })).toBeInViewport();
  });
});

test.describe("layout", () => {
  for (const width of [360, 390, 768, 1280, 1440]) {
    test(`case study fits at ${width}px`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.setViewportSize({ width, height: 900 });
      // Longest title in the supplied records.
      await page.goto("/work/supabase-saas");
      await expect(title(page)).toBeVisible();
      await noHorizontalOverflow(page);

      const titleBox = (await title(page).boundingBox())!;
      const factsBox = (await page.locator("dl").boundingBox())!;
      if (width > 650) {
        expect(factsBox.x).toBeGreaterThan(titleBox.x + titleBox.width / 2);
      } else {
        expect(factsBox.y).toBeGreaterThan(titleBox.y + titleBox.height);
      }

      const decisions = page.locator("#decisions li");
      const tops = await decisions.evaluateAll((items) =>
        items.map((item) => Math.round(item.getBoundingClientRect().top)),
      );
      expect(new Set(tops).size).toBe(width > 900 ? 1 : tops.length);
      expect(errors).toEqual([]);
    });
  }
});

test("case studies make no unverified claims", async ({ page }) => {
  for (const project of projects) {
    await page.goto(`/work/${project.id}`);
    const text = await page.locator("main").innerText();
    expect(text).not.toContain("Case Study A1");
    expect(text).not.toMatch(/\d+%/);
    await expect(page.locator("main img")).toHaveCount(0);
  }
});
