import { Page } from 'tests/e2e/utils';

export default {
	dashboard: {
		url: '/',
		goTo: async ({ page }: { page: Page }) => {
			await page.goto('/');
		}
	},

	login: {
		url: '/login',
		goTo: async ({ page }: { page: Page }) => {
			await page.goto('/login');
		}
	}
};
