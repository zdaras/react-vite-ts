import create from 'zustand';

import { defaultTheme, IThemeMode } from '@/styled/themes';
import storage from '@/utils/storage';
import { userStore } from '@/store/user';

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

export interface IAppStore {
	theme: IThemeMode;
	themeSwitch: () => void;
	initApp: () => void;
}

export default appStore;
