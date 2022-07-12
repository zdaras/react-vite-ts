import { IUserStore } from './user-types';

export const userSelectors = {
	isLoggedIn: (state: IUserStore) => state.isLoggedIn && state.userInfo !== null,
	userInfo: (state: IUserStore) => state.userInfo,
	loading: (state: IUserStore) => state.loading
};
