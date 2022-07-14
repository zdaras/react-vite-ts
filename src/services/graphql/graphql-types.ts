import { useQuery, useMutation, QueryHookOptions, QueryResult, OperationVariables } from '@apollo/client';
import * as ts from 'io-ts';

import { IParam } from '@/types';

export type IGQuery = IParam<typeof useQuery>;

export type IMutation = IParam<typeof useMutation>;

export type IOpts<TData = any, TVariables = OperationVariables> = QueryHookOptions<TData, TVariables> & {
	initialData?: any;
};

export type IReturn<T = any, TVariables = OperationVariables> = QueryResult<T, TVariables> & { data: T };

export type ISchema<ApplicationType = any, EncodeTo = ApplicationType, DecodeFrom = unknown> = ts.Type<
	ApplicationType,
	EncodeTo,
	DecodeFrom
>;
