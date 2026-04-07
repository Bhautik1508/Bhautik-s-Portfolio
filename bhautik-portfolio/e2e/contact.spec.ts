import { test, expect } from "@playwright/test";

test.describe("Contact page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("displays Get in Touch heading", async ({ page }) => {
    await expect(
      page.locator("main").locator("h1").getByText("Get in Touch")
    ).toBeVisible();
  });

  test("shows form fields", async ({ page }) => {
    await expect(page.getByLabel("Your Name *")).toBeVisible();
    await expect(page.getByLabel("Email *")).toBeVisible();
    await expect(page.getByLabel("Subject")).toBeVisible();
    await expect(page.getByLabel("Message *")).toBeVisible();
  });

  test("has submit control", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Send Dispatch →" })
    ).toBeVisible();
  });
});
