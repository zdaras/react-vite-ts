import { ComponentMeta, ComponentStory } from '@storybook/react';

import Ttip from '@/components/library/tooltip';

export default {
	title: 'Tooltip',
	component: Ttip
} as ComponentMeta<typeof Ttip>;

const Template: ComponentStory<typeof Ttip> = ({ ...rest }) => <Ttip {...rest} />;

export const Tooltip = Template.bind({});

Tooltip.args = {
	text: 'Tooltip text'
};
