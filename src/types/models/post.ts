import * as ts from 'io-ts';

import { POST_COMMENT_SCHEMA } from '@/types/models/comment';
import { POST_USER_SCHEMA } from '@/types/models/user';

export const GET_POSTS_SCHEMA = ts.type({
	posts: ts.type({
		data: ts.array(
			ts.type({
				id: ts.string,
				title: ts.string,
				body: ts.string,
				user: POST_USER_SCHEMA,
				comments: ts.type({
					data: ts.array(POST_COMMENT_SCHEMA)
				})
			})
		),
		links: ts.type({
			first: ts.union([ts.type({ page: ts.number, limit: ts.number }), ts.null]),
			prev: ts.union([ts.type({ page: ts.number, limit: ts.number }), ts.null]),
			next: ts.union([ts.type({ page: ts.number, limit: ts.number }), ts.null]),
			last: ts.union([ts.type({ page: ts.number, limit: ts.number }), ts.null])
		})
	})
});

export const ADD_POST_SCHEMA = ts.type({
	createPost: ts.type({
		id: ts.string,
		title: ts.string,
		body: ts.string
	})
});

export const UPDATE_POST_SCHEMA = ts.type({
	updatePost: ts.type({
		id: ts.string,
		body: ts.string
	})
});
