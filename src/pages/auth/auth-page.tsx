import { useLocation, useNavigate } from 'react-router-dom';

import { FormInput, ErrorText, Form } from '@/components/form';
import { Link } from '@/components/library/link';
import Button from '@/components/library/button';
import Helmet from '@/components/shared/helmet';
import { BlockStyled } from '@/styled/shared';
import { H1 } from '@/styled/typography';
import { Flex, FlexItem } from '@/styled/flex';
import { required, isEmail } from '@/utils/validator';
import { useTranslation, useMutation, useGQuery } from '@/hooks';
import { ILoginArgs, SIGNIN_ARGS } from '@/services/graphql/auth/mutation';
import { ME_ARGS } from '@/services/graphql/auth/query';
import { setAuthToken } from '@/services/graphql';
import { userStore } from '@/store/user';

const AuthPage = () => {
	const { t } = useTranslation();
	const { state } = useLocation();
	const navigate = useNavigate();
	const redirect = (state as any)?.from?.pathname;
	const success = userStore(store => store.success);
	const [signin, { loading, data }] = useMutation(SIGNIN_ARGS);
	const { refetch } = useGQuery(ME_ARGS);
	const errorMessage = data?.login.error?.message;

	const onSubmit = async (values: ILoginArgs) => {
		const { data: signInResponse } = await signin({ variables: values });
		await setAuthToken(signInResponse?.login.accessToken);
		const { data: userResponse } = await refetch({ id: signInResponse?.login.userId });
		success(userResponse.me as any);
		if (redirect) navigate(redirect);
	};

	return (
		<>
			<Helmet title={t('Sign In')} />

			<Flex center height="100%">
				<FlexItem flex="0 1 600px">
					<Form onSubmit={onSubmit}>
						<BlockStyled formPadding>
							<H1 weight="600" align="center" margin="0 0 67px" role="heading">
								{t('Sign In')}
							</H1>

							<FormInput name="email" label={t('Enter E-mail')} validate={isEmail} />

							<FormInput name="password" type="password" label={t('Enter Password')} validate={required} />

							<ErrorText center multiline text={errorMessage} show={Boolean(errorMessage)} />

							<Button type="submit" text={t('Sign in')} margin="25px 0" loading={loading} />

							<Link to="/signup">
								<Button buttonType="text" text={t('Sign Up')} />
							</Link>
						</BlockStyled>
					</Form>
				</FlexItem>
			</Flex>
		</>
	);
};

export default AuthPage;
