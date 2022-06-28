import { test, expect } from 'tests/e2e/utils';
import routes from 'tests/e2e/utils/routes';

test.beforeEach(async ({ page }) => {
	await routes.login.goTo({ page });
});

test('login inputs and button is visible', async ({ page }) => {
	await expect(page.locator('input[name="username"]')).toBeVisible();
	await expect(page.locator('input[name="password"]')).toBeVisible();
	await expect(page.locator('button[type=submit]')).toBeVisible();
});
