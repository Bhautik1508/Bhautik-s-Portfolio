import { test, expect } from "@playwright/test";

test.describe("About page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("displays About Me heading", async ({ page }) => {
    await expect(page.getByText("About Me")).toBeVisible();
  });

  test("displays Player Card badge", async ({ page }) => {
    await expect(page.getByText("Player Card")).toBeVisible();
  });

  test("displays bio text", async ({ page }) => {
    await expect(page.getByText(/4 years in fintech/)).toBeVisible();
  });

  test("displays player card with initials BP", async ({ page }) => {
    await expect(page.getByText("BP")).toBeVisible();
  });

  test("displays all three traits", async ({ page }) => {
    await expect(page.getByText("Strategic Thinker")).toBeVisible();
    await expect(page.getByText("Data-Driven")).toBeVisible();
    await expect(page.getByText("0→1 Builder")).toBeVisible();
  });

  test("displays skills section with 4 panels", async ({ page }) => {
    await expect(page.getByText("Skills")).toBeVisible();
    await expect(page.getByText("Data & Analytics")).toBeVisible();
    await expect(page.getByText("Design & Prototyping")).toBeVisible();
    await expect(page.getByText("Technical", { exact: true })).toBeVisible();
    await expect(page.getByText("Product", { exact: true })).toBeVisible();
  });

  test("displays skill tags", async ({ page }) => {
    await expect(page.getByText("SQL")).toBeVisible();
    await expect(page.getByText("Figma")).toBeVisible();
    await expect(page.getByText("Python")).toBeVisible();
  });

  test("displays Off the Clock section with games", async ({ page }) => {
    await expect(page.getByText("Off the Clock")).toBeVisible();
    await expect(page.getByText("Wingspan")).toBeVisible();
    await expect(page.getByText("Gloomhaven")).toBeVisible();
  });
});
