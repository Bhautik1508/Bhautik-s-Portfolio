import { test, expect } from "@playwright/test";

test.describe("Admin Login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/login");
  });

  test("displays Command Centre heading", async ({ page }) => {
    await expect(page.getByText("Command Centre")).toBeVisible();
  });

  test("has email and password inputs", async ({ page }) => {
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
  });

  test("has sign in button", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Sign In" })
    ).toBeVisible();
  });

  test("can type in the email field", async ({ page }) => {
    await page.getByLabel("Email").fill("test@test.com");
    await expect(page.getByLabel("Email")).toHaveValue("test@test.com");
  });

  test("can type in the password field", async ({ page }) => {
    await page.getByLabel("Password").fill("password123");
    await expect(page.getByLabel("Password")).toHaveValue("password123");
  });
});

test.describe("Responsive - Mobile Navigation", () => {
  test("hamburger menu is visible on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "Toggle navigation" })
    ).toBeVisible();
  });

  test("clicking hamburger opens mobile menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.getByRole("button", { name: "Toggle navigation" }).click();
    // Mobile menu should show navigation links
    const mobileMenu = page.locator(".fixed.inset-0");
    await expect(mobileMenu.getByText("About")).toBeVisible();
    await expect(mobileMenu.getByText("Resume")).toBeVisible();
  });
});
