import { test, expect } from '@playwright/test';

test.describe('Character List Flow', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should filter characters by name', async ({ page }) => {
		await page.fill('input[placeholder="Search by name..."]', 'Big Morty');

		await expect(page.locator('text=Big Morty')).toBeVisible();

		const elements = page.locator('.character-card');
		await expect(elements).toHaveCount(1);
	});

	test('should update ordering when order field and direction change', async ({ page }) => {
		const selects = page.locator('select');
		const orderFieldSelect = selects.nth(0);
		const orderDirectionSelect = selects.nth(1);

		await orderFieldSelect.selectOption('status');
		await orderDirectionSelect.selectOption('desc');

		await expect(page.locator('.character-card >> text=Abradolf Lincler')).toBeVisible();
	});

	test('should apply additional filter for status', async ({ page }) => {
		const additionalSelects = page.locator('select');
		const statusSelect = additionalSelects.nth(2);
		await statusSelect.selectOption('Dead');

		const statusElements = page.locator('.character-card p');
		await expect(statusElements).toHaveCount(20);

		const count = await statusElements.count();
		for (let i = 0; i < count; i++) {
			await expect(statusElements.nth(i)).toHaveText(/^Dead - /);
		}
	});

	test('should display empty state message and hide pagination when no results are returned', async ({ page }) => {
		await page.fill('input[placeholder="Search by name..."]', 'nonexistentcharacter');

		await expect(page.locator('text=No characters found')).toBeVisible();

		await expect(page.locator('.pagination')).toHaveCount(0);
	});

	test('should navigate to character detail page when a card is clicked', async ({ page }) => {
		await page.click('.character-card >> text=Rick Sanchez');

		await expect(page.locator('h1')).toContainText('Rick Sanchez');
	});

	test('should display 404 page for an invalid route', async ({ page }) => {
		await page.goto('/invalid-route');

		await expect(page.locator('text=404 - Page not found')).toBeVisible();
	});
});
