import { useMutation as useM } from '@apollo/client';
import * as ts from 'io-ts';

import type { IMutate } from '@/services/graphql/graphql-types';
import { decodeData } from '@/utils/io-ts';

const useGMutation = <T extends IMutate<T>>(args: T) => {
	const hook = useM<ts.TypeOf<T['schema']>, T['options']['variables']>(args.mutation, {
		...args.options,
		onCompleted: (res: any) => decodeData(res, args.schema)
	} as any);

	return hook;
};

export default useGMutation;
