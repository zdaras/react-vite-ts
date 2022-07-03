import create from 'zustand';

import { IUser } from '@/types/models/user';
import storage from '@/utils/storage';
import Api from '@/services/api';
import { setAuthHeader, deleteAuthHeader } from '@/services/api/axios';

const initialState = {
	userInfo: null,
	loading: false,
	isLoggedIn: false,
	error: false
};

export const userStore = create<IUserStore>(set => ({
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
			set({ loading: false, isLoggedIn: true, error: false, userInfo: data });

			return Promise.resolve();
		} catch (e) {
			set({ ...initialState, error: true });

			return Promise.reject(e);
		}
	}
}));

export interface IUserStore {
	userInfo: IUser | null;
	loading: boolean;
	isLoggedIn: boolean;
	error?: boolean;
	logout: () => void;
	getCurrentUser: (withLoading?: boolean) => Promise<any>;
}

export default userStore;
