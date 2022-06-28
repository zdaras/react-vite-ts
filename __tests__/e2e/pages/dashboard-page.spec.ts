import { test, expect } from 'tests/e2e/utils';
import routes from 'tests/e2e/utils/routes';

test.beforeEach(async ({ page }) => {
	await routes.dashboard.goTo({ page });
});

test('correct title', async ({ page }) => {
	await expect(page).toHaveTitle(/Dashboard/);
});
