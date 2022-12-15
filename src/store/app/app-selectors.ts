import { IAppStore } from './app-types';

export const appSelectors = {
	theme: (state: IAppStore) => state.theme
};
