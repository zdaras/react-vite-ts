import { render, screen, expect, describe } from 'test/utils';
import Login from '@/pages/login/login';

describe('Login page', () => {
	it('renders login page', () => {
		render(<Login />);
		expect(screen.getByRole('heading')).toBeDefined();
	});
});
