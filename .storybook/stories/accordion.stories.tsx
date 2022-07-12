import { ComponentMeta, ComponentStory } from '@storybook/react';

import Accord, { AccordionSection } from '@/components/library/accordion';

export default {
	title: 'Accordion',
	component: Accord
} as ComponentMeta<typeof Accord>;

export const Accordion: ComponentStory<typeof Accord> = () => (
	<div style={{ minWidth: '80vw' }}>
		<Accord>
			<AccordionSection title="First" text="First accordion secrion">
				First
			</AccordionSection>
			<AccordionSection title="Second" text="Second accordion secrion">
				Second
			</AccordionSection>
			<AccordionSection title="Third" text="Third accordion secrion">
				Third
			</AccordionSection>
		</Accord>
	</div>
);
