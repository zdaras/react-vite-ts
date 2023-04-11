import { create } from 'zustand';

import { defaultTheme } from '@/styled/themes';
import storage from '@/utils/storage';
import { userStore } from '@/store/user';

import { IAppStore } from './app-types';

export const appStore = create<IAppStore>((set, get) => ({
	theme: storage('theme').get() || defaultTheme,

	themeSwitch: () => {
		const themeToSwitch = get().theme === 'light' ? 'dark' : 'light';
		storage('theme').set(themeToSwitch);
		set({ theme: themeToSwitch });
	},

	initApp: () => {
		const accessToken = storage('access_token').get();
		if (accessToken) userStore.getState().getCurrentUser();
	}
}));

export { appSelectors } from './app-selectors';

export default appStore;
