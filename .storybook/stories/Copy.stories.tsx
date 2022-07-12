import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import CopyEllipsis from '@/components/library/copy/copy-ellipsis';

export default {
	title: 'Copy',
	component: CopyEllipsis
} as ComponentMeta<typeof CopyEllipsis>;

export const Copy: ComponentStoryObj<typeof CopyEllipsis> = {
	args: {
		text: 'Text to copy'
	}
};
