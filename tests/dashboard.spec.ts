import { test, expect } from "@playwright/test";

async function expectDashboardOrLogin(page: any) {
  await page.waitForLoadState("domcontentloaded");

  // If protected, you’ll be redirected
  if (page.url().includes("/login")) {
    // Login page should exist
    await expect(page.getByRole("heading", { name: /login/i })).toBeVisible();
    return "login" as const;
  }

  // Otherwise, dashboard should exist
  await expect(page.getByText(/khel maidan/i)).toBeVisible();
  return "dashboard" as const;
}

test.describe("User Dashboard", () => {
  test("dashboard route should be reachable (dashboard OR redirected to login)", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    const mode = await expectDashboardOrLogin(page);

    if (mode === "dashboard") {
      // Minimal stable checks (don’t depend on bookings)
      await expect(page.getByRole("link", { name: /find courts/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /book a court now/i })).toBeVisible();
      await expect(page.getByText(/upcoming bookings/i)).toBeVisible();
    }
  });

  test("dashboard should have Find Courts link OR show login", async ({ page }) => {
    await page.goto("/dashboard");
    const mode = await expectDashboardOrLogin(page);

    if (mode === "dashboard") {
      const findCourts = page.getByRole("link", { name: /find courts/i });
      await expect(findCourts).toBeVisible();
      await expect(findCourts).toHaveAttribute("href", "/dashboard/courts");
    } else {
      // login mode: ensure forgot password link exists (your login form has it)
      await expect(page.getByRole("link", { name: /forgot password/i })).toBeVisible();
    }
  });

  test("courts page should load OR redirect to login", async ({ page }) => {
    await page.goto("/dashboard/courts");
    const mode = await expectDashboardOrLogin(page);

    if (mode === "dashboard") {
      // Courts page UI (from your server component)
      await expect(page.getByRole("heading", { name: /find courts/i })).toBeVisible();
      await expect(
        page.getByPlaceholder(/search by court name or location/i)
      ).toBeVisible();

      await expect(page.getByRole("link", { name: /back to dashboard/i })).toBeVisible();
    }
  });
});