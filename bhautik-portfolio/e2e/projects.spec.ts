import { test, expect } from "@playwright/test";

test.describe("Projects page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
  });

  test("displays Projects heading and mission badge", async ({ page }) => {
    await expect(page.locator("h1").getByText("Projects")).toBeVisible();
    await expect(page.getByText("Mission Dossier")).toBeVisible();
  });

  test("displays intro copy", async ({ page }) => {
    await expect(
      page.getByText(/A record of products built, problems solved/)
    ).toBeVisible();
  });

  test("shows category filter pills including All", async ({ page }) => {
    await expect(page.getByTestId("filter-All")).toBeVisible();
  });
});
