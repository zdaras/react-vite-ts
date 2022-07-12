import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import TableComponent from '@/components/library/table';

export default {
	title: 'Table',
	component: TableComponent
} as ComponentMeta<typeof TableComponent>;

export const Table: ComponentStoryObj<typeof TableComponent> = {
	args: {
		headers: ['ID', 'Name', 'Date'],
		data: [
			{ id: '91', name: 'Zzzz', date: '15 Jul' },
			{ id: '92', name: 'Zurie', date: '12 Jul' },
			{ id: '93', name: 'Zuriko', date: '11 Jul' }
		],
		containerProps: { style: { minWidth: '40vw', padding: '30px', background: '#fff' } }
	}
};
