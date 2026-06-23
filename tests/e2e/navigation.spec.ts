import { expect, test } from "@playwright/test";

test("home and account journeys remain reachable", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("link", { name: /account|compte/i }).first().click();
  await expect(page).toHaveURL(/\/account$/);
  await expect(page.getByRole("link", { name: /forgot password|mot de passe oublié/i })).toBeVisible();
});

test("mobile navigation exposes every primary destination", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile-only navigation check");
  await page.goto("/");
  const mobileNavigation = page.getByRole("navigation", { name: /mobile/i });
  await expect(mobileNavigation.getByRole("link", { name: /badges/i })).toBeVisible();
  await expect(mobileNavigation.getByRole("link", { name: /profiles|profils/i })).toBeVisible();
  await expect(mobileNavigation.getByRole("link", { name: /rules|règles/i })).toBeVisible();
});
