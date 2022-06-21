import { history } from '@/store';
import { ThunkA } from '@/types';
import storage from '@/utils/storage';
import { userActions } from '@/store/ducks/user';

import app, { appSelectors } from '.';

export const themeSwitchAction = (): ThunkA => async (dispatch, getState) => {
	const store = getState();
	const currentTheme = appSelectors.theme(store);
	const themeToSwitch = currentTheme === 'light' ? 'dark' : 'light';
	storage('theme').set(themeToSwitch);
	dispatch(app.actions.themeSwitch(themeToSwitch));
};

export const routerPush =
	(path: string, state?: any): ThunkA =>
	async () => {
		history.push(path, state);
	};

export const initApp = (): ThunkA => async dispatch => {
	const accessToken = storage('access_token').get();
	if (accessToken) dispatch(userActions.getCurrentUser());
};
