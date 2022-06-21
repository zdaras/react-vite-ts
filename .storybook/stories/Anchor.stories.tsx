import { ComponentMeta, ComponentStory } from '@storybook/react';

import Anchor from '@/components/library/anchor';

export default {
	title: 'Anchor',
	component: Anchor
} as ComponentMeta<typeof Anchor>;

const Template: ComponentStory<typeof Anchor> = ({ ...rest }) => <Anchor {...rest} />;

export const Primary = Template.bind({});

Primary.args = {
	text: 'Google.com',
	href: 'https://google.com',
	target: '_blank',
	rel: 'noreferrer'
};
