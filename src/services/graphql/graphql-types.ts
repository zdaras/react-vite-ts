import {
	useQuery,
	useMutation,
	QueryHookOptions,
	QueryResult,
	OperationVariables,
	MutationHookOptions
} from '@apollo/client';
import * as ts from 'io-ts';

import type { IParam } from '@/types';

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

export type IQuery<Types extends { schema: any }> = {
	query: IGQuery;
	options: IOpts;
	schema: ts.TypeOf<ISchema<Types['schema']>> | any;
};

export type IMutate<Types extends { schema: any }> = {
	mutation: IMutation;
	options: MutationHookOptions;
	schema: ts.TypeOf<ISchema<Types['schema']>> | any;
};
