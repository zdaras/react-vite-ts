import { FC } from '@/types';

import { ITableProps } from './table-types';
import { TR } from './table-styled';

export const Row: FC<IProps> = ({ children, onClick = () => {}, item = {}, index = 0 }) => (
	<TR onClick={() => onClick(item, index)}>{children}</TR>
);

interface IProps extends Pick<ITableProps, 'onClick'> {
	item?: Record<string, any>;
	index?: number;
}

Row.defaultProps = {
	item: {},
	index: 0
};

export default Row;
