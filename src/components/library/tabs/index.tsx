import { ReactNode, useState } from 'react';

import { FC } from '@/types';

import { Tab } from './tab.styled';
import { TabMenu } from './inline.styled';
import { ITab, IPanel } from './tabs-types';

export const Tabs = ({ selected: selectedProps, children = [] }: ITab) => {
	const initialSelected = selectedProps || (children && children[0] ? 0 : 1);
	const [selected, setSelected] = useState<number>(initialSelected);
	const [active, setActive] = useState<string>('');
	const [overflow, setOverflow] = useState('');

	const handleChange = (index: number) => {
		if (index === selected) return;
		setOverflow('hidden');
		setSelected(index);
		setActive('active');
		setTimeout(() => {
			setActive('');
			setOverflow('');
		}, 100);
	};

	return (
		<div style={{ overflow: overflow || 'initial' }} className="tabs">
			<TabMenu>
				{children.map((elem, index) => {
					if (!elem) return null;
					const className = index === selected ? 'tab-title selected' : 'tab-title';

					return (
						<div key={index} className={className} onClick={() => handleChange(index)}>
							{elem.props?.title}
						</div>
					);
				})}
			</TabMenu>

			<Tab>
				<div className={active}>{children[selected] as ReactNode}</div>
			</Tab>
		</div>
	);
};

Tabs.defaultProps = {
	selected: 0
} as Partial<ITab>;

export default Tabs;

export const Panel: FC<IPanel> = ({ children }) => <div>{children}</div>;
