import { IUser } from '@/types/models/user';

export interface IUserStore {
	userInfo: IUser | null;
	loading?: boolean;
	isLoggedIn: boolean;
	error?: boolean;
	logout: () => void;
	getCurrentUser: (withLoading?: boolean) => Promise<any>;
}
