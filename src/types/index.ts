import { FunctionComponent, ReactNode } from 'react';

export type ThenArg<T> = T extends Promise<infer U> ? U : T extends (...args: any[]) => Promise<infer U> ? U : T;

export interface IDropdown {
	id: string;
	name: string;
	code?: string;
	imageUrl?: string;
	[key: string]: any;
}

export type IDropdownArray = IDropdown[];

export interface IPagination {
	startPage?: number;
	limit?: number;
	[key: string]: any;
}

export interface IOtp {
	otp?: string;
}

export type FC<Props = Record<string, any>> = FunctionComponent<Props & { children?: JSX.Element | ReactNode }>;

export type IParam<T extends (...args: any) => any> = Parameters<T>[0];

export type ValueOf<T> = T[keyof T];
