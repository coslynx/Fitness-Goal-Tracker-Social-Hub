import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { setup, teardown } from '../setup';
import { login } from '../helpers';

describe('E2E Tests', () => {
  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await teardown();
  });

  it('should allow users to view and manage their profile information', async () => {
    await login('testuser', 'password123');
    await page.click('a[href="/profile"]');
    expect(await page.textContent('[data-testid="profile-name"]')).toBe(
      'testuser'
    );
    expect(await page.textContent('[data-testid="profile-email"]')).toBe(
      'test@example.com'
    );
  });

  it('should allow users to update their profile information', async () => {
    await login('testuser', 'password123');
    await page.click('a[href="/profile"]');
    await page.click('[data-testid="edit-profile"]');
    await page.fill('[data-testid="profile-name"]', 'Updated User');
    await page.click('[data-testid="save-profile"]');
    await page.waitForTimeout(1000);
    expect(await page.textContent('[data-testid="profile-name"]')).toBe(
      'Updated User'
    );
  });
});