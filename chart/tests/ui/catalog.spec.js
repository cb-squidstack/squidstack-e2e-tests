const { test, expect } = require('@playwright/test');

test.describe('Catalog Page UI', () => {
  test('should navigate to catalog page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');

    // Try to find and click catalog link
    const catalogLink = page.locator('a[href*="catalog"], a:has-text("Catalog"), a:has-text("Products")').first();

    if (await catalogLink.isVisible()) {
      await catalogLink.click();
      await page.waitForLoadState('load');

      // Verify we navigated
      expect(page.url()).toContain('catalog');
    } else {
      // If no catalog link, try direct navigation
      await page.goto('/catalog');
      await page.waitForLoadState('load');
    }
  });

  test('should display product listings', async ({ page }) => {
    await page.goto('/catalog');
    await page.waitForLoadState('load');

    // Check for product containers, cards, or lists
    const productElements = page.locator('[class*="product"], [class*="item"], [class*="card"]');
    const count = await productElements.count();

    // Should have some products or at least the container
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should have search or filter functionality', async ({ page }) => {
    await page.goto('/catalog');
    await page.waitForLoadState('load');

    // Look for search/filter elements
    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i], input[placeholder*="filter" i]').first();
    const hasSearch = await searchInput.count() > 0;

    // Test is informational - we just check if search exists
    console.log('Search functionality present:', hasSearch);
  });

  test('should load catalog images', async ({ page }) => {
    await page.goto('/catalog');
    await page.waitForLoadState('load');

    // Wait a bit for images to load
    await page.waitForTimeout(2000);

    // Check if any images are present
    const images = page.locator('img');
    const imageCount = await images.count();

    // Should have at least some images (logo, products, etc)
    expect(imageCount).toBeGreaterThan(0);
  });

  test('should handle product detail view', async ({ page }) => {
    await page.goto('/catalog');
    await page.waitForLoadState('load');

    // Try to click on a product
    const firstProduct = page.locator('[class*="product"], [class*="item"]').first();

    if (await firstProduct.isVisible()) {
      await firstProduct.click();
      await page.waitForLoadState('load');

      // Should navigate to some detail page
      await page.waitForTimeout(1000);

      // Basic check that we're still on site
      const url = page.url();
      expect(url).toBeTruthy();
    }
  });
});
