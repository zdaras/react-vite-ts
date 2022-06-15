import { useState } from 'react';

import { ThenArg, IParam } from '@/types';
import { useEffectOnce, useFormError } from '@/hooks';
import { IError } from '@/types/error';

const useApi = <T extends (...args: any) => any>(
	apiCallFunction: T,
	params: IParam<typeof apiCallFunction> = {},
	fetchOnMount = true,
	initialData: any = [],
	overridePrevCall = false
): IReturn<T> => {
	const [res, setData] = useState(initialData);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [fetched, setFetched] = useState(false);
	const [fetchCount, setFetchCount] = useState(0);
	const [requestCount, setRequestCount] = useState(0);
	const [p, setParameters] = useState(params);
	const [success, setSuccess] = useState(false);
	const { formError, setFormError } = useFormError();

	const handleFetch = (result: ThenArg<T>) => {
		setFetchCount(prev => {
			const isPrevApiCall = prev > requestCount;
			if (!isPrevApiCall || overridePrevCall) setData(result); // dont overwrite with previous apiCallFunction

			return prev + 1;
		});
	};

	const call = async (par?: IParam<typeof apiCallFunction>, withLoading = true) => {
		try {
			const newParams = par || params;
			if (typeof apiCallFunction === 'function') {
				setRequestCount(prev => prev + 1);
				if (withLoading) setLoading(true);
				setParameters(prev => ({ ...prev, ...newParams }));
				const response: ThenArg<T> = await apiCallFunction(newParams);
				setError(false);
				handleFetch(response);
				setSuccess(true);
				setFormError();

				return Promise.resolve(response);
			}

			return Promise.reject();
		} catch (err) {
			setError(true);
			setFormError(err);

			return Promise.reject(err);
		} finally {
			setLoading(false);
			setFetched(true);
		}
	};

	useEffectOnce(() => {
		if (fetchOnMount) call();
	});

	return { data: res, loading, error, call, fetched, fetchCount, p, requestCount, success, formError };
};

type IReturn<T extends (...args: any) => any> = {
	data: ThenArg<T>;
	loading: boolean;
	error: boolean;
	call: (par?: IParam<T> | undefined, withLoading?: boolean) => Promise<ThenArg<T>>;
	fetched: boolean;
	fetchCount: number;
	p: IParam<T>;
	requestCount: number;
	success: boolean;
	formError: IError;
};

export default useApi;
