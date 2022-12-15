import type { IThemeMode } from '@/styled/themes';

export interface IAppStore {
	theme: IThemeMode;
	themeSwitch: () => void;
	initApp: () => void;
}
