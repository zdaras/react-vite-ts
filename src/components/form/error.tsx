import { FC, memo } from 'react';

import { IError } from '@/types/error';
import { useTranslation } from '@/hooks';

import { ErrorWrapper, ErrorText as Text } from './form-styled';

export const ErrorText: FC<IProps> = ({
	text = '',
	formError,
	center = false,
	margin,
	show = true,
	inForm = false,
	multiline = false,
	inline = false
}) => {
	const { t } = useTranslation();
	const error = formError ?? { errorDescription: '', params: {} };
	const errorMessage = error.errorDescription || text;
	const txt = show && errorMessage ? errorMessage : '';

	return (
		<ErrorWrapper center={center} margin={margin} inForm={inForm} inline={inline} text={txt} role="alert">
			<Text text={txt} center={center} multiline={multiline} inForm={inForm}>
				{t(txt, error.params)}
			</Text>
		</ErrorWrapper>
	);
};

export interface IProps {
	text?: string | any;
	formError?: IError;
	center?: boolean;
	margin?: string;
	show?: boolean;
	inForm?: boolean;
	multiline?: boolean;
	inline?: boolean;
}

export default memo(ErrorText);
