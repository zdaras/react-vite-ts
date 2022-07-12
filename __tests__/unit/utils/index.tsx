import { cleanup, render, RenderOptions, renderHook, act } from '@testing-library/react';
import { afterEach, describe, expect, it, assert, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import '@/services/locale/i18n';

afterEach(() => {
	cleanup();
});

const customRender = (ui: React.ReactElement, options: RenderOptions = {}) =>
	render(ui, {
		// wrap provider(s) here if needed
		wrapper: ({ children }) => {
			return <BrowserRouter>{children}</BrowserRouter>;
		},
		...options
	});

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
export { describe };
export { expect };
export { it };
export { assert };
export { test };
export { renderHook };
export { act };
