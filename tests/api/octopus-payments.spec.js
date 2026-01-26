const { test, expect } = require('@playwright/test');

test.describe('Octopus Payments API', () => {
  test('octopus-payments health check', async ({ request }) => {
    const response = await request.get('/api/payments/health');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test('octopus-payments should return JSON health response', async ({ request }) => {
    const response = await request.get('/api/payments/health');
    const contentType = response.headers()['content-type'];

    expect(contentType).toContain('application/json');

    const body = await response.json();
    expect(body).toBeTruthy();
  });

  test('octopus-payments should require auth for payment operations', async ({ request }) => {
    const response = await request.post('/api/payments/process', {
      data: {},
      failOnStatusCode: false
    });

    // Should respond (typically 401 or 403 without auth)
    expect([400, 401, 403]).toContain(response.status());
  });
});
