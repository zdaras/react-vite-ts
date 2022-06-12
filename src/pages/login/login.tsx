import { useLocation } from 'react-router-dom';

import { FormInput, ErrorText, Form } from '@/components/form';
import { Link } from '@/components/library/link';
import Button from '@/components/library/button';
import Helmet from '@/components/shared/helmet';
import { BlockStyled, H1 } from '@/styled/shared';
import { Flex, FlexItem } from '@/styled/flex';
import { required, isEmail } from '@/utils/validator';
import { userActions } from '@/store/ducks/user';
import { useActions, useApiFormSubmit, useTranslation } from '@/hooks';
import { ILoginParams } from '@/services/api/user/types';

const Login = () => {
	const { t } = useTranslation();
	const { state } = useLocation();
	const redirect = (state as any)?.from?.pathname || '/';
	const login = useActions(userActions.login);
	const { call, formError, loading } = useApiFormSubmit(login);

	const onSubmit = async (values: ILoginParams) => call(values, redirect);

	return (
		<>
			<Helmet title={t('Log In')} />

			<Flex center height="100%">
				<FlexItem flex="0 1 600px">
					<Form onSubmit={onSubmit}>
						<BlockStyled formPadding>
							<H1 weight="600" align="center" margin="0 0 67px">
								{t('Log In')}
							</H1>

							<FormInput name="username" label={t('Enter E-mail')} validate={isEmail} />

							<FormInput
								name="password"
								type="password"
								label={t('Enter Password')}
								validate={required}
								AbsoluteComp={
									<Link to="/forgot-password">
										<Button buttonType="text" text={t('Forgot?')} padding="0" />
									</Link>
								}
							/>

							<ErrorText center multiline formError={formError} />

							<Button type="submit" text={t('Login')} margin="0 0 20px" loading={loading} />

							<Link to="/register">
								<Button buttonType="text" text={t('Sign Up')} />
							</Link>
						</BlockStyled>
					</Form>
				</FlexItem>
			</Flex>
		</>
	);
};

export default Login;
