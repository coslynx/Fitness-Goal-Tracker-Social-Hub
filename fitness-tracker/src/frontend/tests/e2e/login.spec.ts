import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { setup, teardown } from '../setup';
import { login } from '../helpers';

describe('E2E Tests - Login', () => {
  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await teardown();
  });

  it('should successfully login a user with valid credentials', async () => {
    await login('testuser', 'password123');
    expect(await page.textContent('[data-testid="dashboard-welcome"]')).toContain(
      'Welcome, testuser!'
    );
    expect(await page.url()).toBe('http://localhost:3000/dashboard');
  });

  it('should display an error message for invalid credentials', async () => {
    await page.goto('http://localhost:3000/(auth)/login');
    await page.fill('[data-testid="email"]', 'testuser');
    await page.fill('[data-testid="password"]', 'wrongpassword');
    await page.click('[data-testid="login-button"]');
    await page.waitForSelector('[data-testid="login-error"]');
    expect(await page.textContent('[data-testid="login-error"]')).toContain(
      'Invalid credentials'
    );
  });

  // Add more test cases as needed to cover other login scenarios, such as:
  // - Handling forgotten password scenarios
  // - Testing social login integration (if applicable)
  // - Verifying password strength validation (if implemented)
});