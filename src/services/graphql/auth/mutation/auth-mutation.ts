import { gql } from '@apollo/client';

import { LoginSchema, RegisterSchema } from '@/types/models/auth';

import type { ILoginArgs, ISignupArgs } from './auth-mutation-types';

export const SIGNIN_ARGS = {
	mutation: gql`
		mutation login($password: String!, $email: String!) {
			login(password: $password, email: $email) {
				accessToken
				refreshToken
				userId
				error {
					message
				}
			}
		}
	`,
	options: {
		variables: {} as ILoginArgs
	},
	schema: LoginSchema
};

export const SIGNUP_ARGS = {
	mutation: gql`
		mutation signup($password: String!, $email: String!) {
			signup(password: $password, email: $email) {
				success
				error {
					message
				}
			}
		}
	`,
	options: {
		variables: {} as ISignupArgs
	},
	schema: RegisterSchema
};
