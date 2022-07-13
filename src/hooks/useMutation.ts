import { useMutation, MutationHookOptions } from '@apollo/client';
import * as ts from 'io-ts';

import type { ISchema, IGQuery } from '@/services/graphql/graphql-types';
import { decodeData } from '@/utils/io-ts';

const useGMutation = <Q extends IGQuery, O extends MutationHookOptions, S = ISchema>(
	query: Q,
	options: O,
	schema: ts.Type<S>
) => {
	const hook = useMutation<ts.TypeOf<typeof schema>, O['variables']>(query, {
		...options,
		onCompleted: (res: any) => decodeData(res, schema)
	} as any);

	return hook;
};

export default useGMutation;
