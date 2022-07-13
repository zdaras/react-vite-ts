import { useQuery, QueryHookOptions } from '@apollo/client';
import * as ts from 'io-ts';

import { IParam } from '@/types';

export type IGQuery = IParam<typeof useQuery>;

export type IOpts = QueryHookOptions & { initialData?: any };

export type ISchema<ApplicationType = any, EncodeTo = ApplicationType, DecodeFrom = unknown> = ts.Type<
	ApplicationType,
	EncodeTo,
	DecodeFrom
>;
