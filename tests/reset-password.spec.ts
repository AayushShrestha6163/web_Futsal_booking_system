import { test, expect } from "@playwright/test";

test.describe("Password Reset Pages", () => {
  test("request-password-reset should show validation error on empty submit", async ({
    page,
  }) => {
    await page.goto("/request-password-reset");

    await page.getByRole("button", { name: /send reset link/i }).click();

    // zod inline error text
    await expect(page.locator("p.text-red-600").first()).toBeVisible();
  });

  test("reset-password page should load with token and show two password inputs", async ({
    page,
  }) => {
    await page.goto("/reset-password?token=dummy-token-123");

    await expect(
      page.getByRole("heading", { name: /reset password/i })
    ).toBeVisible();

    const pwInputs = page.locator('input[type="password"]');
    await expect(pwInputs).toHaveCount(2);

    await expect(
      page.getByRole("button", { name: /reset password/i })
    ).toBeVisible();
  });
});