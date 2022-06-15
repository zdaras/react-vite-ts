import { useLocation } from 'react-router-dom';

import { Flex, FlexItem } from '@/styled/flex';
import { Form, FormInput, ErrorText } from '@/components/form';
import Button from '@/components/library/button';
import { BlockStyled, H1 } from '@/styled/shared';
import Tooltip from '@/components/library/tooltip';
import Helmet from '@/components/shared/helmet';
import { isValidPassword } from '@/utils/validator';
import { qs } from '@/utils/helpers';
import { userActions } from '@/store/ducks/user';
import { useActions, useTranslation, useApi } from '@/hooks';
import { IParam } from '@/types';

const PasswordRecovery = () => {
	const { t } = useTranslation();
	const queryParams: { key?: string } = qs.parse(useLocation().search);
	const recoverPassword = useActions(userActions.recoverPassword);
	const { call, formError } = useApi(recoverPassword, undefined, false);

	const onSubmit = async (values: IParam<typeof call>) => call({ ...values, key: queryParams.key });

	return (
		<>
			<Helmet title={t('Password Recovery')} />

			<Flex center height="100%">
				<FlexItem flex="0 1 600px">
					<Form onSubmit={onSubmit}>
						{({ methods }) => {
							const passwordValue = methods.watch('password');

							return (
								<BlockStyled formPadding>
									<H1 weight="600" align="center" margin="0 0 60px">
										{t('Password Recovery')}
									</H1>

									<FormInput
										type="password"
										name="password"
										label={t('New password')}
										validate={isValidPassword}
										AbsoluteComp={
											<Tooltip
												text={t(
													'Minimum 8 characters, at least one lowercase, one uppercase letter, one number and one symbol.'
												)}
											/>
										}
									/>

									<FormInput
										type="password"
										name="verifiedPassword"
										label={t('Reset password')}
										validate={value => (value !== passwordValue ? 'Does not match' : undefined)}
										showErrorText
									/>

									<ErrorText center formError={formError} />

									<Button type="submit" text={t('Confirm')} loading={methods.formState.isSubmitting} />
								</BlockStyled>
							);
						}}
					</Form>
				</FlexItem>
			</Flex>
		</>
	);
};

export default PasswordRecovery;
