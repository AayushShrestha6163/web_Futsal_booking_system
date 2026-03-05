import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("should render login page UI", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(
      page.getByText(/welcome back! please enter your details\./i)
    ).toBeVisible();

    await expect(page.getByRole("link", { name: /sign up/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /go to home/i })).toBeVisible();
  });

  test("should have email, password and login button", async ({ page }) => {
    await page.goto("/login");

    const email = page.locator('input[name="email"]');
    const password = page.locator('input[name="password"]');
    const loginBtn = page.getByRole("button", { name: /^login$/i });

    await expect(email).toBeVisible();
    await expect(password).toBeVisible();
    await expect(loginBtn).toBeVisible();

    await expect(email).toHaveAttribute("type", "email");
    await expect(password).toHaveAttribute("type", "password");
  });

  test("should block submit when fields are empty (HTML required validation)", async ({
    page,
  }) => {
    await page.goto("/login");

    const email = page.locator('input[name="email"]');
    const password = page.locator('input[name="password"]');
    const loginBtn = page.getByRole("button", { name: /^login$/i });

    // Make sure both are empty
    await email.fill("");
    await password.fill("");

    // Check native HTML validation (required)
    const emailValid = await email.evaluate((el: HTMLInputElement) =>
      el.checkValidity()
    );
    const passValid = await password.evaluate((el: HTMLInputElement) =>
      el.checkValidity()
    );

    expect(emailValid).toBe(false);
    expect(passValid).toBe(false);

    // Try submit, it should stay on login
    await loginBtn.click();
    await expect(page).toHaveURL(/\/login/i);
  });

  test("should show error message when URL contains ?error=...", async ({ page }) => {
    await page.goto("/login?error=Invalid%20credentials");

    // Your component renders error text inside <p> when `error` exists
    await expect(page.getByText("Invalid credentials")).toBeVisible();
  });

  test("should login successfully (optional: use env credentials)", async ({ page }) => {
    const emailValue = process.env.E2E_EMAIL;
    const passwordValue = process.env.E2E_PASSWORD;

    if (!emailValue || !passwordValue) {
      test.skip(true, "Set E2E_EMAIL and E2E_PASSWORD to run this test.");
    }

    await page.goto("/login");

    await page.locator('input[name="email"]').fill(emailValue!);
    await page.locator('input[name="password"]').fill(passwordValue!);

    await Promise.all([
      page.waitForLoadState("networkidle"),
      page.getByRole("button", { name: /^login$/i }).click(),
    ]);

    // Change this if your app redirects differently after login
    await expect(page).toHaveURL(/dashboard|\/$/i, { timeout: 15000 });
  });
});