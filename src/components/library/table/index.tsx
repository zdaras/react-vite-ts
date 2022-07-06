import { IDataGrid } from '@/types/table';
import { TableComp, TableContainer } from '@/styled/shared/table';

import TableHeader from './table-header';
import TableBody from './table-body';

export function Table<T>({
	headers,
	data,
	showHeader,
	renderHeader,
	renderBody,
	onClick,
	withIcon,
	hoverable,
	overflow,
	containerProps
}: IProps<T>) {
	return (
		<TableContainer overflow={overflow} {...containerProps}>
			<TableComp withIcon={withIcon} hoverable={hoverable}>
				{showHeader && headers && headers.length > 0 && (
					<thead>{renderHeader ? renderHeader(headers) : <TableHeader headers={headers} />}</thead>
				)}
				{data && data.length > 0 && (
					<tbody>
						{renderBody ? (
							data.map((cell, index) => renderBody(cell, index))
						) : (
							<TableBody data={data} onClick={onClick} />
						)}
					</tbody>
				)}
			</TableComp>
		</TableContainer>
	);
}

type IProps<T = Record<string, any>> = IDataGrid<T>;

Table.defaultProps = {
	headers: [],
	data: [],
	showHeader: true,
	onClick: () => {},
	withIcon: false,
	hoverable: true,
	containerProps: {}
} as Partial<IProps>;

export { default as Cell } from './cell';
export { default as Row } from './row';

export default Table;
