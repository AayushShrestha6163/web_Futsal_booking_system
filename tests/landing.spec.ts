import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("should render hero section", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /book your futsal court instantly/i })
    ).toBeVisible();

    await expect(
      page.getByText(/find and book premium futsal courts across nepal/i)
    ).toBeVisible();
  });

  test("should have a Book Now link that points to /login", async ({ page }) => {
    await page.goto("/");

    // ✅ Most reliable: match by ARIA role (link) + accessible name
    // Your hero "Book Now" includes an icon, so name might be "Book Now ChevronRight"
    const bookNowLinks = page.getByRole("link", { name: /book now/i });

    const count = await bookNowLinks.count();
    expect(count).toBeGreaterThan(0);

    // Check the first matching link points to /login
    const href = await bookNowLinks.first().getAttribute("href");
    expect(href).toContain("/login");
  });

  test("nav buttons should scroll to sections", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /^services$/i }).click();
    await expect(page.locator("#services")).toBeVisible();

    await page.getByRole("button", { name: /^about$/i }).click();
    await expect(page.locator("#about")).toBeVisible();

    await page.getByRole("button", { name: /^download$/i }).click();
    await expect(page.locator("#download")).toBeVisible();
  });

  test("should show footer contact info", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText(/\+977-9861637799/)).toBeVisible();
    await expect(page.getByText(/info@khelmaidan\.np/i)).toBeVisible();
    await expect(page.getByText(/2025 Khel Maidan/i)).toBeVisible();
  });
});