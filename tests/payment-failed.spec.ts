import { test, expect } from "@playwright/test";

test.describe("Payment Failed Page", () => {
  test("should render failed UI with bookingId", async ({ page }) => {
    await page.goto("/payment-failed?bookingId=BOOK999");

    await expect(
      page.getByRole("heading", { name: /payment failed/i })
    ).toBeVisible();

    await expect(page.getByText(/booking id:\s*book999/i)).toBeVisible();
  });

  test("should render even when bookingId is missing", async ({ page }) => {
    await page.goto("/payment-failed");

    await expect(
      page.getByRole("heading", { name: /payment failed/i })
    ).toBeVisible();

    await expect(page.getByText(/booking id:/i)).toBeVisible();
  });
});