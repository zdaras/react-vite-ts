import create from 'zustand';

import storage from '@/utils/storage';
import Api from '@/services/api';
import { setAuthHeader, deleteAuthHeader } from '@/services/api/axios';

import { IUserStore } from './user-types';

const initialState = { userInfo: null, loading: false, isLoggedIn: false };

export const userStore = create<IUserStore>((set, get) => ({
	...initialState,

	logout: () => {
		const refresh_token: string = storage('refresh_token').get();
		Api.user.logout({ refresh_token });
		deleteAuthHeader();
		set(initialState);
	},

	getCurrentUser: async (withLoading = true) => {
		try {
			if (withLoading) set({ loading: true });
			const access_token: string = storage('access_token').get();
			const refresh_token: string = storage('refresh_token').get();
			const data = await Api.user.currentUser(access_token);
			setAuthHeader({ access_token, refresh_token });
			set({ loading: false, isLoggedIn: true, userInfo: data });

			return Promise.resolve();
		} catch (e) {
			set(initialState);

			return Promise.reject(e);
		}
	},

	login: async (params, callback) => {
		try {
			const res = await Api.user.login(params);
			setAuthHeader(res);
			await get().getCurrentUser(false);
			if (typeof callback === 'function') callback();

			return Promise.resolve();
		} catch (e) {
			return Promise.reject(e);
		}
	}
}));

export { userSelectors } from './user-selectors';

export default userStore;
