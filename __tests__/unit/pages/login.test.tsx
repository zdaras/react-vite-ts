import { render, screen } from 'tests/unit/utils';
import Login from '@/pages/login/login';

describe('Login page', () => {
	it('renders login page and title', () => {
		render(<Login />);
		expect(screen.getByRole('heading')).toBeDefined();
	});
});
