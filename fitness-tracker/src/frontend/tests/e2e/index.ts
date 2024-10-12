import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { setup, teardown } from '../setup';
import { login, register } from '../helpers';

describe('E2E Tests', () => {
  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await teardown();
  });

  it('should register a new user successfully', async () => {
    await register('testuser', 'test@example.com', 'password123');
    expect(await page.title()).toBe('Fitness Goal Tracker & Social Hub');
  });

  it('should login a registered user successfully', async () => {
    await login('testuser', 'password123');
    expect(await page.title()).toBe('Fitness Goal Tracker & Social Hub');
  });

  it('should display the user dashboard after successful login', async () => {
    await login('testuser', 'password123');
    expect(await page.url()).toBe('http://localhost:3000/dashboard');
  });

  it('should allow users to set a new fitness goal', async () => {
    await login('testuser', 'password123');
    await page.click('a[href="/goals"]');
    await page.fill('[data-testid="goal-title"]', 'Lose 10 pounds');
    await page.fill('[data-testid="goal-target"]', '10');
    await page.fill('[data-testid="goal-deadline"]', '2024-12-31');
    await page.click('[data-testid="create-goal"]');
    await page.waitForSelector('[data-testid="goal-card"]');
    expect(await page.textContent('[data-testid="goal-card"]')).toContain('Lose 10 pounds');
  });

  it('should track user progress for their set goals', async () => {
    await login('testuser', 'password123');
    await page.click('a[href="/goals"]');
    await page.waitForSelector('[data-testid="goal-card"]');
    expect(await page.textContent('[data-testid="goal-card"]')).toContain('Progress: 0%');
  });

  it('should allow users to share their progress on the social feed', async () => {
    await login('testuser', 'password123');
    await page.click('a[href="/social"]');
    await page.fill('[data-testid="post-content"]', 'Just finished my workout!');
    await page.click('[data-testid="create-post"]');
    await page.waitForSelector('[data-testid="post-card"]');
    expect(await page.textContent('[data-testid="post-card"]')).toContain('Just finished my workout!');
  });

  it('should enable users to view and interact with other users\' posts', async () => {
    await login('testuser', 'password123');
    await page.click('a[href="/social"]');
    await page.waitForSelector('[data-testid="post-card"]');
    await page.click('[data-testid="like-post"]');
    expect(await page.textContent('[data-testid="post-card"]')).toContain('Likes: 1');
  });

  it('should allow users to view and manage their profile information', async () => {
    await login('testuser', 'password123');
    await page.click('a[href="/profile"]');
    expect(await page.textContent('[data-testid="profile-name"]')).toBe('testuser');
    expect(await page.textContent('[data-testid="profile-email"]')).toBe('test@example.com');
  });

  it('should allow users to update their profile information', async () => {
    await login('testuser', 'password123');
    await page.click('a[href="/profile"]');
    await page.click('[data-testid="edit-profile"]');
    await page.fill('[data-testid="profile-name"]', 'Updated User');
    await page.click('[data-testid="save-profile"]');
    await page.waitForTimeout(1000);
    expect(await page.textContent('[data-testid="profile-name"]')).toBe('Updated User');
  });

  it('should allow users to access and manage their settings', async () => {
    await login('testuser', 'password123');
    await page.click('a[href="/settings"]');
    expect(await page.url()).toBe('http://localhost:3000/settings');
  });
});