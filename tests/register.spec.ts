import { test, expect } from "@playwright/test";

test.describe("Register Page", () => {
  test("should render register page UI", async ({ page }) => {
    await page.goto("/register");

    await expect(page.getByRole("heading", { name: /sign up/i })).toBeVisible();
    await expect(
      page.getByText(/please fill your details to create an account\./i)
    ).toBeVisible();

    await expect(page.getByRole("link", { name: /login/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /go to home/i })).toBeVisible();
  });

  test("should have full name, email, password inputs and sign up button", async ({
    page,
  }) => {
    await page.goto("/register");

    const name = page.locator('input[placeholder="Aayush Shrestha"]');
    const email = page.locator('input[type="email"]');
    const password = page.locator('input[type="password"]');
    const signUpBtn = page.getByRole("button", { name: /^sign up$/i });

    await expect(name).toBeVisible();
    await expect(email).toBeVisible();
    await expect(password).toBeVisible();
    await expect(signUpBtn).toBeVisible();
  });

  test("should show validation errors when submitting empty form (zod)", async ({
    page,
  }) => {
    await page.goto("/register");

    await page.getByRole("button", { name: /^sign up$/i }).click();

    // Your errors are shown as <p className="text-xs text-red-600 mt-1">...</p>
    // We don't need exact messages; just ensure at least one red error appears.
    const errors = page.locator("p.text-red-600");
    await expect(errors.first()).toBeVisible();
  });

  test("should redirect to /login after successful signup (mocked)", async ({
    page,
  }) => {
    /**
     * Your SignupForm calls: handleRegister(values)
     * That is a server action, so Playwright cannot intercept it like a normal fetch easily.
     *
     * The most reliable E2E approach:
     * - Run against real backend with test DB, OR
     * - Keep this test as a "UI flow" mock by forcing navigation after click (not ideal), OR
     * - Use a real API endpoint that SignupForm hits (if handleRegister uses fetch/axios to your backend)
     *
     * ✅ If handleRegister internally calls your backend API (recommended),
     * you can intercept that API here.
     *
     * Example below assumes your backend register endpoint is:
     * POST /api/auth/register  (change this to your real endpoint)
     */

    // Change this URL pattern to your real backend endpoint if you have it:
    await page.route("**/api/**register**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/register");

    await page.locator('input[placeholder="Aayush Shrestha"]').fill("Test User");
    await page.locator('input[type="email"]').fill("testuser@email.com");
    await page.locator('input[type="password"]').fill("Password123!");

    await page.getByRole("button", { name: /^sign up$/i }).click();

    // Your code does router.push("/login")
    await expect(page).toHaveURL(/\/login/i, { timeout: 15000 });
  });
});