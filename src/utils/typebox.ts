import { TSchema, Static } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler';

import config from '@/utils/config';

export const decode = <T extends TSchema>(schema: T, data: Static<typeof schema>, defaultDecode = true) => {
	if (config.isProd || !defaultDecode) {
		return data;
	}

	const C = TypeCompiler.Compile(schema);
	const isValid = C.Check(data);

	if (!isValid) {
		console.warn(
			JSON.stringify(
				[...C.Errors(data)].map(({ path, message, value }) => {
					let key: string = path || '';
					let val: any = value || '';
					if (key.startsWith('/')) key = key.substring(1).replaceAll('/', '.');
					if (typeof val === 'string') val = `'${val}'`;
					return `${key}: ${message} got ${val}`;
				})
			)
		);
	}

	return data;
};
