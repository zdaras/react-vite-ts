import { LoginSchema, UserSchema, RegisterSchema } from '@/types/models/user';
import { decode } from '@/utils/typebox';

import { post, authToken } from '../axios';
import { ILoginParams, IRegisterParams, ISendRecoveryEmailParams, ILogoutParams } from './types';

export default {
	login: (params: ILoginParams) => post('auth/login', params).then(({ data }) => decode(LoginSchema, data)),
	register: (params: IRegisterParams) => post('auth/register', params).then(({ data }) => decode(RegisterSchema, data)),
	currentUser: (token: string) =>
		post('auth/user-info', null, { headers: { [authToken]: `Bearer ${token}` } }).then(({ data }) =>
			decode(UserSchema, data)
		),
	sendRecoveryEmail: (params: ISendRecoveryEmailParams) =>
		post('auth/password-recover-email', params).then(({ data }) => data),
	logout: (params: ILogoutParams) => post('auth/logout', params).then(({ data }) => data)
};
