import { useState } from 'react';

import { ThenArg, IParam } from '@/types';
import { useEffectOnce, useFormError } from '@/hooks';
import { IError } from '@/types/error';

const useApi = <T extends (...args: any) => any>(asyncFunction: T, config: IConfig<T>): IReturn<T> => {
	const defaultConfig = { initData: [], initParams: {}, callOnMount: true };
	const { initData, callOnMount, initParams } = { ...defaultConfig, ...config }; // overwrite default config
	const [res, setData] = useState(initData);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [fetched, setFetched] = useState(false);
	const [fetchCount, setFetchCount] = useState(0);
	const [requestCount, setRequestCount] = useState(0);
	const [parameters, setParameters] = useState(initParams);
	const [success, setSuccess] = useState(false);
	const { formError, setFormError } = useFormError();

	const handleFetch = (result: ThenArg<T>) => {
		setFetchCount(prev => {
			const isPrevApiCall = prev > requestCount;
			if (!isPrevApiCall) setData(result); // dont overwrite with previous asyncFunction

			return prev + 1;
		});
	};

	const call = async (par?: IParam<typeof asyncFunction>, ...functionParams: any[]) => {
		try {
			if (typeof asyncFunction === 'function') {
				const newParams = par || initParams;
				setRequestCount(prev => prev + 1);
				setLoading(true);
				setParameters(prev => ({ ...prev, ...newParams }));
				const response: ThenArg<T> = await asyncFunction(newParams, ...functionParams);
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
		if (callOnMount) call();
	});

	return { data: res, loading, error, call, fetched, fetchCount, parameters, requestCount, success, formError };
};

type IReturn<T extends (...args: any) => any> = {
	data: ThenArg<T>;
	loading: boolean;
	error: boolean;
	call: (...functionParams: Parameters<T>) => Promise<ThenArg<T>>;
	fetched: boolean;
	fetchCount: number;
	parameters: IParam<T>;
	requestCount: number;
	success: boolean;
	formError: IError;
};

type IConfig<T extends (...args: any) => any> = {
	initParams?: IParam<T>;
	callOnMount?: boolean;
	initData?: any;
};

export default useApi;
