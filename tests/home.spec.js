const { test, expect } = require('@playwright/test');

test.describe('Squidstack Home Page', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Squid/i);
  });

  test('should display main content', async ({ page }) => {
    await page.goto('/');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    // Basic check that the page rendered
    const body = await page.locator('body');
    await expect(body).toBeVisible();
  });
});

test.describe('API Health Checks', () => {
  test('kraken-auth health check', async ({ request }) => {
    const response = await request.get('/api/auth/health');
    expect(response.ok()).toBeTruthy();
  });

  test('clam-catalog health check', async ({ request }) => {
    const response = await request.get('/api/catalog/health');
    expect(response.ok()).toBeTruthy();
  });
});
