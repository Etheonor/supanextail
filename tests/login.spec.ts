import { test } from '@playwright/test';

test('login test', async ({ page }) => {
	const myURL: string = process.env.PLAYWRIGHT_TEST_BASE_URL
		? process.env.PLAYWRIGHT_TEST_BASE_URL
		: ('http://localhost:3000/' as string);

	await page.goto(myURL);
	// Go through all pages
	await page.click('#signup');
	await page.type('#email', process.env.USER_LOGIN ? process.env.USER_LOGIN : '');

	await page.type('#password', process.env.USER_PASSWORD ? process.env.USER_PASSWORD : '');

	await page.click('#loginBtn');

	await page.waitForSelector('#logOutBtn', {
		state: 'visible',
	});
});
