import { test, expect } from '@playwright/test';

test('should display characters and navigate to detail page', async ({ page }) => {
	await page.goto('/');

	await expect(page.locator('text=Rick Sanchez')).toBeVisible();

	await page.fill('input[placeholder="Search by name..."]', 'Morty');
	await page.waitForTimeout(1000);
	await expect(page.locator('text=Morty Smith')).toBeVisible();

	await page.click('text=Morty Smith');

	await expect(page.locator('h1')).toContainText('Morty Smith');

	await page.click('text=Back');
	await expect(page.locator('text=Rick and Morty Characters')).toBeVisible();
});
