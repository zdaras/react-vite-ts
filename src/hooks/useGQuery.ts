import { useQuery } from '@apollo/client';
import * as ts from 'io-ts';

import { decodeData } from '@/utils/io-ts';
import type { IQuery, IReturn } from '@/services/graphql/graphql-types';

const useGQuery = <T extends IQuery<T>>(args: T): IReturn<ts.TypeOf<T['schema']>, T['options']['variables']> => {
	const { initialData = [] } = args.options;
	const { data = initialData, ...hook } = useQuery(args.query, {
		...args.options,
		onCompleted: res => decodeData(res, args.schema)
	});

	return { data, ...hook } as any;
};

export default useGQuery;
