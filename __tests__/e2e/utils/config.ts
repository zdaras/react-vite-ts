import { devices } from '@playwright/test';
import dotenv from 'dotenv';

type IBuildMode = 'development' | 'test' | 'production';

const BUILD_MODE = process.env.BUILD_MODE as IBuildMode;

dotenv.config({ path: `${process.cwd()}/.env.${BUILD_MODE}` });

export const env = {
	BUILD_MODE,
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.VITE_PORT || 8080,
	IS_DEV: BUILD_MODE === 'development',
	IS_TEST: BUILD_MODE === 'test',
	IS_PROD: BUILD_MODE === 'production',
	BASE_URL: `http://localhost:${process.env.VITE_PORT || 8080}`
};

const webServerCommandList = {
	development: 'npm run start',
	test: 'npm run start-test-server',
	production: 'npm run start-prod-server'
};

export const webServerCommand = webServerCommandList[BUILD_MODE] || webServerCommandList['development'];

export const viewports = {
	large: { width: 2560, height: 1440 },
	desktop: { width: 1920, height: 961 },
	laptop: { width: 1536, height: 746 }
};

export const paths = {
	testDir: '__tests__/e2e',
	outputDir: '__tests__/e2e/static',
	globalSetup: '__tests__/e2e/utils/global-setup.ts',
	reporterOutputFolder: '__tests__/e2e/reports',
	storageState: '__tests__/e2e/storage-state/storageState.json'
};

export const desktopProjects = [
	{ name: 'chromium desktop', use: { ...devices['Desktop Chrome'], viewport: viewports.desktop } }
	// { name: 'chromium laptop', use: { ...devices['Desktop Chrome'], viewport: viewports.laptop } },
	// { name: 'chromium 2k screen', use: { ...devices['Desktop Chrome'], viewport: viewports.large } },
	// { name: 'firefox desktop', use: { ...devices['Desktop Firefox'], viewport: viewports.desktop } },
	// { name: 'webkit desktop', use: { ...devices['Desktop Safari'], viewport: viewports.desktop } }
];

export const mobileProjects = [
	// { name: 'mobile chrome', use: { ...devices['Pixel 5'] } },
	// { name: 'mobile safari', use: { ...devices['iPhone 12'] } }
];
