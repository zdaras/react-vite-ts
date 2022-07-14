import { useMutation, MutationHookOptions } from '@apollo/client';
import * as ts from 'io-ts';

import type { ISchema, IMutation } from '@/services/graphql/graphql-types';
import { decodeData } from '@/utils/io-ts';

const useGMutation = <M extends IMutation, O extends MutationHookOptions, S = ISchema>(
	mutation: M,
	options: O,
	schema: ts.Type<S>
) => {
	const hook = useMutation<ts.TypeOf<typeof schema>, O['variables']>(mutation, {
		...options,
		onCompleted: (res: any) => decodeData(res, schema)
	} as any);

	return hook;
};

export default useGMutation;
