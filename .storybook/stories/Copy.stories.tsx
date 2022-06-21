import { ComponentMeta, ComponentStory } from '@storybook/react';

import Copy from '@/components/library/copy/copy-ellipsis';

export default {
	title: 'Copy',
	component: Copy
} as ComponentMeta<typeof Copy>;

const Template: ComponentStory<typeof Copy> = ({ ...rest }) => <Copy {...rest} />;

export const Primary = Template.bind({});

Primary.args = {
	text: 'Text to copy'
};
