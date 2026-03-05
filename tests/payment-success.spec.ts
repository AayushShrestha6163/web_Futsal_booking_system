import { test, expect } from "@playwright/test";

test.describe("Payment Success Page", () => {
  test("should render success UI and show bookingId from query", async ({ page }) => {
    await page.goto("/payment-sucess?bookingId=BOOK123");

    await expect(
      page.getByRole("heading", { name: /payment success/i })
    ).toBeVisible();

    await expect(page.getByText(/booking id:\s*book123/i)).toBeVisible();
  });

  test("should still render even if bookingId is missing", async ({ page }) => {
    await page.goto("/payment-sucess");

    await expect(
      page.getByRole("heading", { name: /payment success/i })
    ).toBeVisible();

    await expect(page.getByText(/booking id:/i)).toBeVisible();
  });
});