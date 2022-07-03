import { ValidateResult } from 'react-hook-form';

export type IVal = (data: any) => ValidateResult | Promise<ValidateResult>;

export type IValidation = IVal | Record<string, IVal>;

type ValidationOptionObject<Value> =
	| Value
	| {
			value: Value;
			message: string;
	  };

export type IRegExp = ValidationOptionObject<RegExp>;

export interface IModes {
	create: 'create';
	edit: 'edit';
}
export interface IFormState {
	mode: keyof IModes;
	isOpen: boolean;
	selectedItem: Record<string, any>;
}

export type IFormReset = (values?: Partial<Record<string, any>>) => void;
