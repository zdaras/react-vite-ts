import { PlaywrightTestConfig } from '@playwright/test';

import { viewports, paths, desktopProjects, mobileProjects, env, webServerCommand } from 'tests/e2e/utils/config';

export default {
	testDir: paths.testDir,
	outputDir: paths.outputDir,
	globalSetup: paths.globalSetup,
	timeout: 30 * 1000,
	expect: { timeout: 5 * 1000 },
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? 'dot' : [['list'], ['html', { open: 'never', outputFolder: paths.reporterOutputFolder }]],
	use: {
		baseURL: env.BASE_URL,
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
		ignoreHTTPSErrors: true,
		viewport: viewports.desktop,
		storageState: paths.storageState
	},
	projects: [...desktopProjects, ...mobileProjects],
	webServer: {
		command: webServerCommand,
		port: env.PORT,
		ignoreHTTPSErrors: true,
		reuseExistingServer: !process.env.CI
	} // Run your local dev server before starting the tests
} as PlaywrightTestConfig;
