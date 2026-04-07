import { test, expect } from "@playwright/test";

test.describe("Resume page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resume");
  });

  test("displays Experience heading", async ({ page }) => {
    await expect(page.getByText("Experience")).toBeVisible();
  });

  test("displays Campaign History badge", async ({ page }) => {
    await expect(page.getByText("Campaign History")).toBeVisible();
  });

  test("displays all three work experience entries", async ({ page }) => {
    await expect(page.getByText("Standard Chartered Bank")).toBeVisible();
    await expect(page.getByText(/Addivity/)).toBeVisible();
    await expect(page.getByText("Prodapt Solutions")).toBeVisible();
  });

  test("displays job roles", async ({ page }) => {
    const main = page.locator("main");
    await expect(
      main.getByRole("heading", { name: "Product Manager" })
    ).toBeVisible();
    await expect(main.getByText("Co-founder & Product Lead")).toBeVisible();
    await expect(main.getByText("Business Analyst")).toBeVisible();
  });

  test("displays Education section", async ({ page }) => {
    await expect(page.getByText("Education")).toBeVisible();
    await expect(
      page.getByText("Master of Business Administration")
    ).toBeVisible();
  });

  test("displays Download Resume CTA", async ({ page }) => {
    const cta = page.getByText(/Download Full Resume/);
    await expect(cta).toBeVisible();
  });

  test("displays experience tags", async ({ page }) => {
    await expect(page.getByText("Payments", { exact: true })).toBeVisible();
    await expect(page.getByText("KYC", { exact: true })).toBeVisible();
  });
});
