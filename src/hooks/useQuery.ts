import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { IParam, ThenArg } from '@/types';
import { useFormError } from '@/hooks';
import type { IError } from '@/types/error';

const useReactQuery = <T extends (...args: any) => any>(asyncFunction: T, options?: IConfig<T>) => {
	const initialEnable = options?.enabled ?? true;
	const [enabled, setEnabled] = useState(initialEnable);
	const [parameters, setParameters] = useState(options?.params);
	const { formError } = useFormError();

	const defaultOptions: IQueryOptions = {
		initialData: [],
		refetchOnWindowFocus: false,
		keepPreviousData: true,
		enabled,
		...options
	};

	const result = useQuery<ThenArg<T>>(
		[asyncFunction.name, parameters],
		() => asyncFunction(parameters),
		defaultOptions as any
	);

	const refetch = async (newParameters?: IParam<T>) => {
		const newParams = newParameters || options?.params;
		if (!initialEnable) await setEnabled(true);
		await setParameters(prev => ({ ...prev, ...newParams }));
		if (!initialEnable) result.refetch();
	};

	const err = (result.error as IError) ?? formError;

	return { ...result, data: result.data as ThenArg<T>, refetch, parameters, call: refetch, error: err };
};

type IQueryOptions = Parameters<typeof useQuery>[2];

type IConfig<T extends (...args: any) => any> = {
	params?: IParam<T>;
} & IQueryOptions;

export default useReactQuery;
