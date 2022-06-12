import { useState } from 'react';

import { ThenArg } from '@/types';
import { IError } from '@/types/error';

import { useFormError } from '.';

const useApiInForm = <T>(callFunction: T, params = {}): IReturn<T> => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const { formError, setFormError } = useFormError();

	const call = async (par: any = null, withLoading = true) => {
		try {
			if (typeof callFunction === 'function') {
				const parameters = par || params;
				if (withLoading) setLoading(true);
				setFormError();
				const response: ThenArg<T> = await callFunction(parameters);
				setError(false);
				setSuccess(true);

				return Promise.resolve(response);
			}
			return Promise.reject();
		} catch (err) {
			setFormError(err);
			setError(true);
			return Promise.reject(err);
		} finally {
			setLoading(false);
		}
	};

	// @ts-ignore
	return { call, formError, loading, success, error };
};

type IReturn<T> = {
	call: T;
	formError: IError;
	loading: boolean;
	success: boolean;
	error: boolean;
};

export default useApiInForm;
