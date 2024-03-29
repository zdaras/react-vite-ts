import { memo, useState, FC } from 'react';

import { toastStore } from '@/store/toast';
import type { IToast } from '@/store/toast/toast-types';
import timer from '@/utils/timer';
import { CheckCircle, ErrorOutlineIcon, ExclamationIcon, WarningIcon } from '@/components/icons';
import { Loading } from '@/components/shared/loading-large';
import { useTranslation } from '@/hooks';

import { ToastStyled, ToastIconStyled, ToastTextStyled, ToastTitle } from './toast-styled';

export const Toast: FC<IProps> = ({ toast }) => {
	const { t } = useTranslation();
	const [countdown] = useState(toast.timeout || 0);
	const hideToast = toastStore(store => store.hideToast);
	const autoHideTimer = timer(toast.autoClose ? () => hideToast(toast) : () => false, countdown);
	const handleMouseEnter = () => autoHideTimer.pause();
	const handleMouseLeave = () => autoHideTimer.resume();
	const handleOnClick = (tst: IToast) => {
		if (tst.closeOnClick) autoHideTimer.cancel(true);
	};

	return (
		<ToastStyled
			onClick={() => handleOnClick(toast)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			type={toast.type}
		>
			<ToastIconStyled type={toast.type}>
				{(() => {
					switch (toast.type) {
						case 'info':
							return <ExclamationIcon />;
						case 'success':
							return <CheckCircle />;
						case 'warning':
							return <WarningIcon />;
						case 'danger':
							return <ErrorOutlineIcon />;
						case 'processing':
							return <Loading width="45px" height="45px" margin="0" />;
						default:
							return null;
					}
				})()}
			</ToastIconStyled>
			<ToastTextStyled>
				<ToastTitle>
					{(() => {
						switch (toast.type) {
							case 'info':
								return t('Info');
							case 'success':
								return t('Success');
							case 'warning':
								return t('Warning');
							case 'danger':
								return t('Error');
							case 'processing':
								return t('Processing');
							default:
								return null;
						}
					})()}
				</ToastTitle>
				<span>{t(toast.text || '')}</span>
			</ToastTextStyled>
		</ToastStyled>
	);
};

interface IProps {
	toast: IToast;
}

export default memo(Toast);
