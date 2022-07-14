import { gql } from '@apollo/client';

import { ADD_POST_SCHEMA, UPDATE_POST_SCHEMA } from '@/types/models/post';

import { GET_POSTS_ARGS } from '../query';
import type { IAddPostArgs, IUpdatePostArgs } from './posts-mutation-types';

export const ADD_POST_ARGS = {
	mutation: gql`
		mutation createPost($input: CreatePostInput!) {
			createPost(input: $input) {
				id
				title
				body
			}
		}
	`,
	options: {
		refetchQueries: [{ query: GET_POSTS_ARGS.query, variables: GET_POSTS_ARGS.options.variables }],
		variables: {} as IAddPostArgs
	},
	schema: ADD_POST_SCHEMA
};

export const UPDATE_POST_ARGS = {
	mutation: gql`
		mutation updatePost($id: ID!, $input: UpdatePostInput!) {
			updatePost(id: $id, input: $input) {
				id
				body
			}
		}
	`,
	options: {
		refetchQueries: [{ query: GET_POSTS_ARGS.query, variables: GET_POSTS_ARGS.options.variables }],
		variables: {} as IUpdatePostArgs
	},
	schema: UPDATE_POST_SCHEMA
};
