import { FC, useState } from 'react';

import Modal from '@/components/library/modal';
import Button from '@/components/library/button';
import { ErrorText } from '@/components/form';
import { H5 } from '@/styled/shared';
import { useFormError, useTranslation } from '@/hooks';

export const ConfirmModal: FC<IProps> = ({ isOpen, closeModal, closeParentModal, onSubmit, text, autoClose }) => {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const { formError, setFormError } = useFormError();

	const handleSubmit = async () => {
		try {
			setFormError();
			setLoading(true);
			await onSubmit();
			if (autoClose) closeModal();
			if (typeof closeParentModal === 'function') closeParentModal();
		} catch (error) {
			setFormError(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal size="small" closeIcon={false} isOpen={isOpen} closeModal={closeModal} title={t('Confirmation')} centerTitle>
			{text && (
				<H5 opacity="1" padding="0 0 24px" align="center">
					{t(text)}
				</H5>
			)}
			<ErrorText formError={formError} center />
			<Button text={t('Confirm')} margin="0 0 15px" loading={loading} onClick={handleSubmit} />
			<Button text={t('Cancel')} buttonType="text" onClick={closeModal} />
		</Modal>
	);
};

interface IProps {
	isOpen: boolean;
	closeModal: () => void;
	closeParentModal?: () => any;
	onSubmit: (p?: any) => Promise<any>;
	text?: string;
	autoClose?: boolean;
}

ConfirmModal.defaultProps = {
	text: '',
	autoClose: true
} as Partial<IProps>;

export default ConfirmModal;
