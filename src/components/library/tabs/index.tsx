import { ReactNode, useState } from 'react';

import { ITab, IPanel } from '@/types/tabs';
import { FC } from '@/types';

import { Tab } from './tab.styled';
import { TabMenu } from './inline.styled';

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

					return (
						<li key={index} className={index === selected ? 'selected' : ''} onClick={() => handleChange(index)}>
							{elem.props?.title}
						</li>
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
