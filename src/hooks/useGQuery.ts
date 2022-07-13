import { useQuery } from '@apollo/client';
import * as ts from 'io-ts';

import type { ISchema, IGQuery, IOpts, IReturn } from '@/services/graphql/graphql-types';
import { decodeData } from '@/utils/io-ts';

const useGQuery = <Q extends IGQuery, O extends IOpts, S = ISchema>(
	query: Q,
	options: O,
	schema: ts.Type<S>
): IReturn<ts.TypeOf<typeof schema>> => {
	const { initialData = [] } = options;
	const { data = initialData, ...hook } = useQuery(query, {
		...options,
		onCompleted: res => schema && decodeData(res, schema)
	});

	return { data, ...hook };
};

export default useGQuery;
