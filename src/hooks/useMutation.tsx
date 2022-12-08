import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { IParam, ThenArg } from '@/types';
import { useFormError } from '@/hooks';
import type { IError } from '@/types/error';

const useCustomMutation = <T extends (...args: any) => any>(asyncFunction: T, options?: IOptions) => {
	const { formError } = useFormError();
	const defaultOptions: IOptions = { cacheTime: 0, ...options };
	const mutation = useMutation<ThenArg<T>, unknown, IParam<T>>({ mutationFn: asyncFunction, ...defaultOptions });
	const err = (mutation.error as IError) ?? formError;

	return { ...mutation, data: mutation.data as ThenArg<T>, error: err };
};

type IOptions = Omit<UseMutationOptions, 'mutationFn'>;

export default useCustomMutation;
