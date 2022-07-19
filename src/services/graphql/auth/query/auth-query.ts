import { gql } from '@apollo/client';

import { UserSchema } from '@/types/models/auth';

import { IMeArgs } from './auth-query-types';

export const ME_ARGS = {
	query: gql`
		query me($id: String!) {
			me(id: $id) {
				id
				email
				username
				error {
					message
				}
			}
		}
	`,
	options: {
		skip: true,
		variables: {} as IMeArgs
	},
	schema: UserSchema
};
