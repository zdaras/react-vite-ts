import { IOtp } from '@/types';

export interface ILoginParams extends IOtp {
	username: string;
	password: string;
	trustDevice?: boolean;
}

export interface IRegisterParams {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	confirmPassword?: string;
	termsAccepted?: boolean;
	subscribe?: boolean;
}

export interface ISendRecoveryEmailParams {
	username?: string;
}

export interface ILogoutParams {
	refresh_token?: string;
}
