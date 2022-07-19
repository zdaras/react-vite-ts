import { Link } from '@/components/library/link';
import { Flex, FlexItem } from '@/styled/flex';
import { Form, FormInput, ErrorText } from '@/components/form';
import Button from '@/components/library/button';
import { BlockStyled } from '@/styled/shared';
import { H1, H4, H5 } from '@/styled/typography';
import Tooltip from '@/components/library/tooltip';
import Helmet from '@/components/shared/helmet';
import { isEmail, isValidPassword } from '@/utils/validator';
import { useTranslation, useMutation } from '@/hooks';
import { SIGNUP_ARGS, ISignupArgs } from '@/services/graphql/auth/mutation';

const SignUpPage = () => {
	const { t } = useTranslation();
	const [signup, { loading, data }] = useMutation(SIGNUP_ARGS);
	const success = Boolean(data?.signup?.success);
	const errorMessage = data?.signup?.error?.message;

	const onSubmit = (values: ISignupArgs) => signup({ variables: values });

	return (
		<>
			<Helmet title={t('Sign up')} />

			<Flex center full>
				<FlexItem flex="0 1 600px">
					<Form onSubmit={onSubmit}>
						{({ methods }) => {
							const passwordValue = methods.watch('password');

							return (
								<BlockStyled formPadding transparent={success}>
									<H1 weight="600" align="center" margin="0 0 50px">
										{t('Sign up')}
									</H1>

									{success ? (
										<Flex center full>
											<H4 align="center" margin="0">
												{t('You registered successfuly. Check your email for additional instructions')}
											</H4>
										</Flex>
									) : (
										<>
											<FormInput name="email" label={t('E-mail Address')} validate={isEmail} />

											<FormInput
												type="password"
												name="password"
												label={t('Password')}
												validate={isValidPassword}
												AbsoluteComp={
													<Tooltip
														text={t(
															'Password must be at least 8 characters, with at least one lowercase, one uppercase, one number and one symbol.'
														)}
													/>
												}
											/>

											<FormInput
												type="password"
												name="confirmPassword"
												label={t('Confirm Password')}
												validate={value => (value !== passwordValue ? 'Does not match' : undefined)}
											/>

											<ErrorText center multiline text={errorMessage} show={Boolean(errorMessage)} />

											<Button type="submit" text={t('Sign Up')} loading={loading} />

											<Flex center margin="20px 0 0">
												<H5 align="center" padding="12px 0 0">
													{t('Already have an account?')}
												</H5>
												<Link to="/auth">
													<Button text={t('Sign In')} buttonType="text" padding="10px" />
												</Link>
											</Flex>
										</>
									)}
								</BlockStyled>
							);
						}}
					</Form>
				</FlexItem>
			</Flex>
		</>
	);
};

export default SignUpPage;
