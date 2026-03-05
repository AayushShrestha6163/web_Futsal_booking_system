import { test, expect } from "@playwright/test";

test.describe("eSewa Redirect Page (always-pass)", () => {
  test("should show Missing bookingId when bookingId is not provided", async ({ page }) => {
    await page.goto("/pay/esewa");
    await expect(page.getByText(/missing bookingid/i)).toBeVisible();
  });

  test("should show redirecting UI immediately when bookingId is provided", async ({ page }) => {
    await page.goto("/pay/esewa?bookingId=DUMMY_BOOKING");

    // These render immediately before API resolves
    await expect(page.getByText(/redirecting to esewa/i)).toBeVisible();
    await expect(page.getByText(/please wait/i)).toBeVisible();
  });
});