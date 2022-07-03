import { memo } from 'react';

import { toastStore } from '@/store/toast';

import { ToastContainerStyled } from './toast-styled';
import Toast from './toast';

export const ToastContainer = () => {
	const data = toastStore(store => store.data);
	const showToasts = data.length > 0;

	if (!showToasts) return null;

	return (
		<ToastContainerStyled>
			{data.map(toast => (
				<Toast key={toast.id} toast={toast} />
			))}
		</ToastContainerStyled>
	);
};

export default memo(ToastContainer);
