import { gql } from '@apollo/client';

import { IOpts } from '@/services/graphql/graphql-types';
import { GET_POSTS_SCHEMA } from '@/types/models/post';

interface IGetPostsArgs {
	options: {
		paginate: {
			page: number;
			limit: number;
		};
		sort: {
			field: string;
			order: 'ASC' | 'DESC';
		};
		search: {
			q: string;
		};
	};
}

export const GET_POSTS_OPTIONS: IOpts = {
	initialData: { posts: { data: [], links: { prev: { page: null }, next: { page: null } } } },
	variables: { options: { paginate: { page: 1, limit: 10 }, sort: { field: 'id', order: 'DESC' } } } as IGetPostsArgs
};

export const GET_POSTS = gql`
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
`;

export const GET_POSTS_ARGS = [GET_POSTS, GET_POSTS_OPTIONS, GET_POSTS_SCHEMA] as const; // must always be 3 item array
