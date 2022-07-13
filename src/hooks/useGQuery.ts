import { useQuery } from '@apollo/client';
import * as ts from 'io-ts';

import type { ISchema, IGQuery, IOpts } from '@/services/graphql/graphql-types';
import { decodeData } from '@/utils/io-ts';

const useGQuery = <Q extends IGQuery, O extends IOpts, S = ISchema>(query: Q, options: O, schema: ts.Type<S>) => {
	const hook = useQuery<ts.TypeOf<typeof schema>>(query, { ...options, onCompleted: data => decodeData(data, schema) });

	return hook;
};

export default useGQuery;
