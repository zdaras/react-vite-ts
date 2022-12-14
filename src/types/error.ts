import { Type, Static } from '@sinclair/typebox';

export const IErrorValidator = Type.Object({
	errorCode: Type.Union([Type.Number(), Type.Undefined(), Type.String()]),
	errorDescription: Type.Union([Type.String(), Type.Undefined()]),
	params: Type.Union([Type.Undefined(), Type.Record(Type.String(), Type.Any())])
});

export type IError = Static<typeof IErrorValidator>;
