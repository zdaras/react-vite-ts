import { gql } from '@apollo/client';

import { ADD_POST_SCHEMA, UPDATE_POST_SCHEMA } from '@/types/models/post';

import { GET_POSTS, GET_POSTS_OPTIONS } from '../query';

export interface IAddPostArgs {
	input: {
		title?: string;
		body?: string;
	};
}

const ADD_POST_OPTIONS = {
	refetchQueries: [{ query: GET_POSTS, variables: GET_POSTS_OPTIONS.variables }],
	variables: {} as IAddPostArgs
};

export const ADD_POST = gql`
	mutation createPost($input: CreatePostInput!) {
		createPost(input: $input) {
			id
			title
			body
		}
	}
`;

export const ADD_POST_ARGS = [ADD_POST, ADD_POST_OPTIONS, ADD_POST_SCHEMA] as const;

export interface IUpdatePostArgs {
	id: string;
	input: {
		body?: string;
	};
}

const UPDATE_POST_OPTIONS = {
	refetchQueries: [{ query: GET_POSTS, variables: GET_POSTS_OPTIONS.variables }],
	variables: {} as IUpdatePostArgs
};

export const UPDATE_POST = gql`
	mutation ($id: ID!, $input: UpdatePostInput!) {
		updatePost(id: $id, input: $input) {
			id
			body
		}
	}
`;

export const UPDATE_POST_ARGS = [UPDATE_POST, UPDATE_POST_OPTIONS, UPDATE_POST_SCHEMA] as const; // must always be 3 item array
