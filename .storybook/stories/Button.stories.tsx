import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import Button from '@/components/library/button';

export default {
	title: 'Button',
	component: Button
} as ComponentMeta<typeof Button>;

export const Primary: ComponentStoryObj<typeof Button> = {
	args: {
		buttonType: 'primary',
		text: 'Primary',
		inline: true
	}
};

export const Text: ComponentStoryObj<typeof Button> = {
	args: {
		buttonType: 'text',
		text: 'Text button',
		inline: true
	}
};
