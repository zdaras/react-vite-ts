import TableHeader from './table-header';
import TableBody from './table-body';
import { ITableProps } from './table-types';
import { TableComp, TableContainer } from './table-styled';

export function Table<T>({
	headers,
	data,
	showHeader,
	renderHeader,
	renderBody,
	onClick,
	hoverable,
	overflow,
	containerProps
}: IProps<T>) {
	return (
		<TableContainer overflow={overflow} {...containerProps}>
			<TableComp hoverable={hoverable}>
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

type IProps<T = Record<string, any>> = ITableProps<T>;

Table.defaultProps = {
	headers: [],
	data: [],
	showHeader: true,
	onClick: () => {},
	hoverable: true,
	containerProps: {}
} as Partial<IProps>;

export { default as Cell } from './cell';
export { default as Row } from './row';

export default Table;
