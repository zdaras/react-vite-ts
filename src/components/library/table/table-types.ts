export type IRow<T = Record<string, any>> = T;

export type IColumn = any;

export interface ITableProps<T = IRow> {
	headers?: IColumn[];
	data?: T[];
	showHeader?: boolean;
	onClick?: (item: T, index?: number) => any | Promise<any>;
	renderHeader?: (item: any) => any;
	renderBody?: (item: T, index: number) => any;
	hoverable?: boolean;
	overflow?: string;
	containerProps?: Record<string, any>;
}
