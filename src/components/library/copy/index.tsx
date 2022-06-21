import { memo, useState } from 'react';

import { CopyIcon } from '@/components/icons';
import { FC } from '@/types';
import { useTranslation } from '@/hooks';

import { CopyContainer, CopyText } from './copy-styled';

export const Copy: FC<IProps> = ({ text, icon, children, onClick }) => {
	const { t } = useTranslation();
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		try {
			const textField = document.createElement('textarea');
			textField.innerText = text;
			document.body.appendChild(textField);
			textField.select();
			document.execCommand('copy');
			textField.remove();
			setCopied(true);
			if (typeof onClick === 'function') onClick();
			setTimeout(() => {
				setCopied(false);
			}, 3000);
		} catch (error) {
			setCopied(false);
		}
	};

	return (
		<CopyContainer onClick={handleCopy}>
			{icon ? <CopyIcon /> : children}
			<CopyText copied={copied}>{t('Copied')}</CopyText>
		</CopyContainer>
	);
};

export interface IProps {
	text: string;
	icon?: boolean;
	onClick?: () => any;
}

Copy.defaultProps = {
	text: '',
	icon: true
} as Partial<IProps>;

export default memo(Copy);
