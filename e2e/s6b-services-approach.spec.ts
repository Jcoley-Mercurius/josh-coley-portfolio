import { expect, test } from "@playwright/test";

// S6b: A1 Services ("What we build") and Approach replace the legacy priced
// packages. Pricing is a scoped quote from the brief; no figures on the page.

const services = [
  { title: "Business websites", cta: "Discuss a website", value: "website" },
  { title: "Booking experiences", cta: "Discuss a booking project", value: "booking" },
  { title: "SaaS & portals", cta: "Discuss a SaaS or portal", value: "saas" },
  { title: "Marketplaces", cta: "Discuss a marketplace", value: "marketplace" },
];

test("services list the four A1 project types with no prices or packages", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#services");
  await expect(section.getByRole("heading", { level: 2 })).toHaveText(
    /From first impression\s*to everyday operation\./,
  );
  await expect(section.getByRole("heading", { level: 3 })).toHaveText(
    services.map((service) => service.title),
  );
  await expect(section).toContainText("quoted from its brief");

  const body = await page.locator("main").innerText();
  expect(body).not.toMatch(/\$\s?\d/);
  for (const legacy of ["Most Popular", "per month", "Retainer", "50% upfront"]) {
    expect(body).not.toContain(legacy);
  }
});

test("approach follows services and explains the quote", async ({ page }) => {
  await page.goto("/");
  const ids = await page
    .locator("main > section[id]")
    .evaluateAll((sections) => sections.map((section) => section.id));
  expect(ids.indexOf("approach")).toBe(ids.indexOf("services") + 1);

  const approach = page.locator("#approach");
  await expect(approach.getByRole("heading", { level: 3 })).toHaveText([
    /01 \/\s*Define the product/,
    /02 \/\s*Design the experience/,
    /03 \/\s*Build and verify/,
  ]);
  await expect(approach).toContainText("fixed quote for that scope before work begins");
});

test("nav reaches the approach section", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Approach" }).click();
  await expect(page).toHaveURL(/#approach$/);
  await expect(page.locator("#approach")).toBeInViewport();
});

for (const service of services) {
  test(`"${service.cta}" opens the brief with ${service.value} preselected`, async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("#contact").getByRole("button", { name: /send project brief/i }),
    ).toBeEnabled();
    await page.locator("#services").getByRole("link", { name: service.cta }).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator("#inquiry-service")).toHaveValue(service.value);
  });
}

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("services and approach are server-rendered and links still reach the form", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator("#services").getByRole("heading", { level: 3 })).toHaveCount(4);
    await expect(page.locator("#approach").getByRole("heading", { level: 3 })).toHaveCount(3);
    await expect(
      page.locator("#services").getByRole("link", { name: "Discuss a website" }),
    ).toHaveAttribute("href", "#contact");
  });
});

test("home page follows the A1 prototype sections, with nothing from the old site", async ({
  page,
}) => {
  await page.goto("/");
  const ids = await page
    .locator("main > section[id]")
    .evaluateAll((sections) => sections.map((section) => section.id));
  expect(ids).toEqual(["work", "services", "approach", "about", "contact"]);

  const about = page.locator("#about");
  await expect(about.getByRole("heading", { level: 2 })).toHaveText(
    /Classical inspiration\.\s*Contemporary development\./,
  );

  const body = await page.locator("main").innerText();
  for (const legacy of ["Why Work With Me", "Not your typical developer", "Business first"]) {
    expect(body).not.toContain(legacy);
  }
  // The legacy theme's blue accent (#2563eb) no longer reaches any element.
  const blue = await page.locator("main *").evaluateAll(
    (els) =>
      els.filter((el) => {
        const style = getComputedStyle(el);
        return [style.color, style.backgroundColor, style.borderTopColor].includes(
          "rgb(37, 99, 235)",
        );
      }).length,
  );
  expect(blue).toBe(0);
});
