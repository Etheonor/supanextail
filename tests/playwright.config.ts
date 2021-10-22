// playwright.config.ts

import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	projects: [
		{
			name: 'Chrome Stable',
			use: {
				baseURL: process.env.NEXT_PUBLIC_VERCEL_URL
					? process.env.NEXT_PUBLIC_VERCEL_URL
					: 'http://localhost:3000',
				browserName: 'chromium',
				// Test against Chrome Stable channel.
				channel: 'chrome',
			},
		},
		{
			name: 'Desktop Safari',
			use: {
				baseURL: process.env.NEXT_PUBLIC_VERCEL_URL
					? process.env.NEXT_PUBLIC_VERCEL_URL
					: 'http://localhost:3000',
				browserName: 'webkit',
				viewport: { width: 1200, height: 750 },
			},
		},
		// Test against mobile viewports.
		{
			name: 'Desktop Firefox',
			use: {
				baseURL: process.env.NEXT_PUBLIC_VERCEL_URL
					? process.env.NEXT_PUBLIC_VERCEL_URL
					: 'http://localhost:3000',
				browserName: 'firefox',
				viewport: { width: 800, height: 600 },
			},
		},
	],
};
export default config;
