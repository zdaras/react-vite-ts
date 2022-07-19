import * as ts from 'io-ts';

const ErrorSchema = ts.union([ts.null, ts.type({ message: ts.string })]);

export const LoginSchema = ts.type({
	login: ts.type({
		accessToken: ts.union([ts.string, ts.null]),
		refreshToken: ts.union([ts.string, ts.null]),
		userId: ts.union([ts.string, ts.null]),
		error: ErrorSchema
	})
});

export const RegisterSchema = ts.type({
	signup: ts.type({
		success: ts.union([ts.boolean, ts.null]),
		error: ErrorSchema
	})
});

export const UserSchema = ts.type({
	me: ts.type({
		id: ts.union([ts.string, ts.null]),
		email: ts.union([ts.string, ts.null]),
		username: ts.union([ts.string, ts.null]),
		error: ErrorSchema
	})
});
