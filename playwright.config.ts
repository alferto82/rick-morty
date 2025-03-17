import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export default defineConfig({
	use: {
		baseURL: process.env.BASE_URL,
		headless: true,
		viewport: { width: 1280, height: 720 },
		actionTimeout: 5000
	},
	testDir: './tests'
});
