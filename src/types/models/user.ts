import { Type, Static } from '@sinclair/typebox';

export const LoginSchema = Type.Object({
	access_token: Type.String(),
	expires_in: Type.Number(),
	refresh_expires_in: Type.Number(),
	refresh_token: Type.String()
});

export type ILoginResponse = Static<typeof LoginSchema>;

export const UserSchema = Type.Object({
	id: Type.String(),
	emailVerified: Type.Union([Type.Boolean(), Type.Undefined()]),
	username: Type.String(),
	hasTwoFa: Type.Boolean(),
	hasTwoFaOnLogin: Type.Boolean(),
	fname: Type.Union([Type.String(), Type.Null()]),
	lname: Type.Union([Type.String(), Type.Null()])
});

export type IUser = Static<typeof UserSchema>;

export const RegisterSchema = Type.String();

export type IRegister = Static<typeof RegisterSchema>;
