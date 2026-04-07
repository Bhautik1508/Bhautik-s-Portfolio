import { test, expect, type Page } from "@playwright/test";

/** Header primary nav only (footer also has `<nav>` — avoid strict-mode collisions). */
function mainNav(page: Page) {
  return page.locator("header nav");
}

test.describe("Navigation", () => {
  test("homepage loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Bhautik Patel/);
  });

  test("navbar has all 5 navigation links", async ({ page }) => {
    await page.goto("/");
    const nav = mainNav(page);
    await expect(nav.getByText("Home")).toBeVisible();
    await expect(nav.getByText("About")).toBeVisible();
    await expect(nav.getByText("Projects")).toBeVisible();
    await expect(nav.getByText("Resume")).toBeVisible();
    await expect(nav.getByText("Contact")).toBeVisible();
  });

  test("clicking About navigates to /about", async ({ page }) => {
    await page.goto("/");
    await mainNav(page).getByText("About").click();
    await expect(page).toHaveURL("/about");
    await expect(page.getByText("About Me")).toBeVisible();
  });

  test("clicking Projects navigates to /projects", async ({ page }) => {
    await page.goto("/");
    await mainNav(page).getByText("Projects").click();
    await expect(page).toHaveURL("/projects");
    await expect(page.locator("h1").getByText("Projects")).toBeVisible();
  });

  test("clicking Resume navigates to /resume", async ({ page }) => {
    await page.goto("/");
    await mainNav(page).getByText("Resume").click();
    await expect(page).toHaveURL("/resume");
    await expect(page.getByText("Experience")).toBeVisible();
  });

  test("clicking Contact navigates to /contact", async ({ page }) => {
    await page.goto("/");
    await mainNav(page).getByText("Contact").click();
    await expect(page).toHaveURL("/contact");
    await expect(page.locator("h1").getByText("Get in Touch")).toBeVisible();
  });

  test("clicking wordmark returns to homepage", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("link", { name: "Home" }).first().click();
    await expect(page).toHaveURL("/");
  });
});
