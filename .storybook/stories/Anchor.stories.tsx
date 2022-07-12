import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import A from '@/components/library/anchor';

export default {
	title: 'Anchor',
	component: A
} as ComponentMeta<typeof A>;

export const Anchor: ComponentStoryObj<typeof A> = {
	args: {
		text: 'Google.com',
		href: 'https://google.com'
	}
};
