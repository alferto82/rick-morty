import { test, expect } from '@playwright/test';

test.describe('Character Detail Caching', () => {
	test('navigating from homepage does NOT call detail API due to cache', async ({ page }) => {
		let detailRequestCalled = false;

		await page.route('**/api/character/8', route => {
			detailRequestCalled = true;
			route.continue();
		});

		await page.goto('/');
		await expect(page.locator('text=Adjudicator Rick')).toBeVisible();

		await page.click('text=Adjudicator Rick');

		await expect(page.locator('h1')).toContainText('Adjudicator Rick');

		await page.waitForTimeout(1000);

		expect(detailRequestCalled).toBeFalsy();
	});

	test('direct navigation to detail calls the detail API', async ({ page }) => {
		let detailRequestCalled = false;

		await page.route('**/api/character/8', route => {
			detailRequestCalled = true;
			route.continue();
		});

		await page.goto('/character/8');

		await expect(page.locator('h1')).toContainText('Adjudicator Rick');

		expect(detailRequestCalled).toBeTruthy();
	});
});
