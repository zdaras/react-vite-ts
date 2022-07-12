import { ComponentMeta, ComponentStory } from '@storybook/react';

import LoadingTable from '@/components/shared/loading-table';

export default {
	title: 'Loading table',
	component: LoadingTable
} as ComponentMeta<typeof LoadingTable>;

export const Default: ComponentStory<typeof LoadingTable> = ({ ...rest }) => (
	<div style={{ width: '1000px' }}>
		<LoadingTable {...rest} />
	</div>
);
