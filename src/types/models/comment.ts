import * as ts from 'io-ts';

export const POST_COMMENT_SCHEMA = ts.type({
	id: ts.string,
	name: ts.string,
	email: ts.string,
	body: ts.string
});
