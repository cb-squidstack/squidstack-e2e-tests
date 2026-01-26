const { test, expect } = require('@playwright/test');

test.describe('Nautilus Inventory API', () => {
  test('nautilus-inventory health check', async ({ request }) => {
    const response = await request.get('/api/inventory/health');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test('nautilus-inventory should return JSON health response', async ({ request }) => {
    const response = await request.get('/api/inventory/health');
    const contentType = response.headers()['content-type'];

    expect(contentType).toContain('application/json');

    const body = await response.json();
    expect(body).toBeTruthy();
  });

  test('nautilus-inventory should have stock endpoint', async ({ request }) => {
    const response = await request.get('/api/inventory/stock/1', {
      failOnStatusCode: false
    });

    // Should respond (not 404)
    expect(response.status()).not.toBe(404);
  });
});
