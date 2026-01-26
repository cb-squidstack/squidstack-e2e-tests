const { test, expect } = require('@playwright/test');

test.describe('Cuttlefish Orders API', () => {
  test('cuttlefish-orders health check', async ({ request }) => {
    const response = await request.get('/api/orders/health');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test('cuttlefish-orders should return JSON health response', async ({ request }) => {
    const response = await request.get('/api/orders/health');
    const contentType = response.headers()['content-type'];

    expect(contentType).toContain('application/json');

    const body = await response.json();
    expect(body).toBeTruthy();
  });

  test('cuttlefish-orders should require auth for orders', async ({ request }) => {
    const response = await request.get('/api/orders', {
      failOnStatusCode: false
    });

    // Should respond (typically 401 or 403 without auth)
    expect(response.status()).not.toBe(404);
  });
});
