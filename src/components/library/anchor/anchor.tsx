import { AnchorHTMLAttributes, memo } from 'react';

import { FC } from '@/types';

import { AnchorStyled } from './anchor-styled';

export const Anchor: FC<AnchorHTMLAttributes<HTMLAnchorElement> & { text?: string }> = ({
	children,
	text = '',
	...props
}) => <AnchorStyled {...props}>{text || children}</AnchorStyled>;

export default memo(Anchor);
