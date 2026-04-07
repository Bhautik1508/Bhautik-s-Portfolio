import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays hero heading with name", async ({ page }) => {
    await expect(page.locator("h1").getByText("Bhautik")).toBeVisible();
    await expect(page.locator("h1").getByText("Patel")).toBeVisible();
  });

  test("displays overline text", async ({ page }) => {
    await expect(
      page
        .locator("main")
        .getByText("Product Manager · Fintech · IIT Delhi MBA", { exact: true })
    ).toBeVisible();
  });

  test("displays tagline about fintech products", async ({ page }) => {
    await expect(
      page.getByText(/build 0→1 fintech products/)
    ).toBeVisible();
  });

  test("has View Projects CTA that links to /projects", async ({ page }) => {
    const cta = page.getByText("View Projects →");
    await expect(cta).toBeVisible();
    await cta.click();
    await expect(page).toHaveURL("/projects");
  });

  test("has Download Resume CTA", async ({ page }) => {
    const resume = page.getByText("↓ Download Resume");
    await expect(resume).toBeVisible();
  });

  test("displays all 4 stat cards", async ({ page }) => {
    await expect(page.getByText("Yrs Experience")).toBeVisible();
    await expect(page.getByText("Products Launched")).toBeVisible();
    await expect(page.getByText("Revenue Impact")).toBeVisible();
    await expect(page.getByText("Delhi MBA", { exact: true })).toBeVisible();
  });

  test("navbar shows Available badge", async ({ page }) => {
    await expect(page.getByText("Available")).toBeVisible();
  });

  test("footer displays copyright", async ({ page }) => {
    await expect(page.getByText(/© 2025 Bhautik Patel/)).toBeVisible();
  });

  test("footer has social links", async ({ page }) => {
    await expect(page.getByLabel("LinkedIn")).toBeVisible();
    await expect(page.getByLabel("GitHub")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
  });
});
