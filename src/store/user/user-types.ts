import { ILoginParams } from '@/services/api/user/types';
import { IUser } from '@/types/models/user';

export interface IUserStore {
	userInfo: IUser | null;
	loading?: boolean;
	isLoggedIn: boolean;
	error?: boolean;
	logout: (withLoading: boolean) => void;
	getCurrentUser: (withLoading?: boolean) => Promise<any>;
	login: (params: ILoginParams, callback?: () => any) => Promise<any>;
}
