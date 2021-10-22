import { expect, test } from '@playwright/test';

test('basic test', async ({ page }) => {
	console.log(process.env.PLAYWRIGHT_TEST_BASE_URL);
	await page.goto('https://playwright.dev/');
	const title = page.locator('.navbar__inner .navbar__title');
	await expect(title).toHaveText('Playwright');
});
