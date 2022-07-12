import { ComponentMeta, ComponentStory } from '@storybook/react';

import D from '@/components/library/datepicker';

export default {
	title: 'Datepicker',
	component: D
} as ComponentMeta<typeof D>;

export const Datepicker: ComponentStory<typeof D> = () => (
	<div style={{ width: '276px', height: '300px' }}>
		<D />
	</div>
);

export const DatepickerWithDate: ComponentStory<typeof D> = () => (
	<div style={{ width: '276px', height: '300px' }}>
		<D value={new Date() as any} />
	</div>
);
