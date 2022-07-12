export type IRow<T = Record<string, any>> = T;

export type IColumn = any;

export interface ITableProps<T = IRow> {
	headers?: IColumn[];
	data?: T[];
	showHeader?: boolean;
	onClick?: (arg1: Record<string, any>, arg2: number) => any | Promise<any>;
	renderHeader?: (arg1: any) => any;
	renderBody?: (arg1: T, arg2: number) => any;
	hoverable?: boolean;
	overflow?: string;
	containerProps?: Record<string, any>;
}
