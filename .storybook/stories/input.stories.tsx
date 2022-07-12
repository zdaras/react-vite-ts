import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import InputComponent from '@/components/library/input';

export default {
	title: 'Input',
	component: InputComponent
} as ComponentMeta<typeof InputComponent>;

export const Input: ComponentStoryObj<typeof InputComponent> = {
	args: { label: 'Label' }
};

export const Checkbox: ComponentStoryObj<typeof InputComponent> = {
	args: { label: 'Checkbox', type: 'checkbox', id: 'checkbox', name: 'checkbox' }
};

export const Radio: ComponentStoryObj<typeof InputComponent> = {
	args: { label: 'Radio', type: 'radio', id: 'radio', name: 'radio' }
};
