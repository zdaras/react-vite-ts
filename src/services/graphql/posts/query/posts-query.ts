import { gql } from '@apollo/client';

import { GET_POSTS_SCHEMA } from '@/types/models/post';

import { IGetPostsArgs } from './posts-query-types';

export const GET_POSTS_ARGS = {
	query: gql`
		query getPosts($options: PageQueryOptions) {
			posts(options: $options) {
				data {
					id
					title
					body
					user {
						name
						email
					}
					comments {
						data {
							id
							name
							email
							body
						}
					}
				}
				links {
					first {
						page
						limit
					}
					prev {
						page
						limit
					}
					next {
						page
						limit
					}
					last {
						page
						limit
					}
				}
			}
		}
	`,
	options: {
		notifyOnNetworkStatusChange: true,
		initialData: { posts: { data: [], links: { prev: { page: null }, next: { page: null } } } },
		variables: { options: { paginate: { page: 1, limit: 10 }, sort: { field: 'id', order: 'DESC' } } } as IGetPostsArgs
	},
	schema: GET_POSTS_SCHEMA
};
