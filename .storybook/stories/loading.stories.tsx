import { ComponentMeta, ComponentStory } from '@storybook/react';

import L from '@/components/shared/loading';

export default {
	title: 'Loading',
	component: L
} as ComponentMeta<typeof L>;

const Template: ComponentStory<typeof L> = ({ ...rest }) => <L {...rest} />;

export const Loading = Template.bind({});

Loading.args = {
	loading: true,
	loadingText: ''
};
