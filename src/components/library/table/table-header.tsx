import { FC } from 'react';

import { IColumn } from './table-types';
import { Cell, Row } from './index';

export const TableHeader: FC<IProps> = ({ headers }) => (
	<Row>
		{headers.map((header, index) => (
			<Cell key={`header-${header}-${index}`}>{header}</Cell>
		))}
	</Row>
);

export interface IProps {
	headers: IColumn[];
}

export default TableHeader;
