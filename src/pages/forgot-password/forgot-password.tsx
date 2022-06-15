import { Flex, FlexItem } from '@/styled/flex';
import { BlockStyled, H1, H4, H5 } from '@/styled/shared';
import { Form, FormInput, ErrorText } from '@/components/form';
import { Link } from '@/components/library/link';
import Button from '@/components/library/button';
import Helmet from '@/components/shared/helmet';
import Api from '@/services/api';
import { useApi, useTranslation } from '@/hooks';
import { required } from '@/utils/validator';
import { IParam } from '@/types';

const Forgot = () => {
	const { t } = useTranslation();
	const { call, formError, loading, success } = useApi(Api.user.sendRecoveryEmail, undefined, false);

	const onSubmit = async (values: IParam<typeof call>) => call(values);

	return (
		<>
			<Helmet title={t('Forgot Password')} />

			<Flex center height="100%">
				<FlexItem flex="0 1 600px">
					<Form onSubmit={onSubmit}>
						<BlockStyled formPadding height="460px">
							{success ? (
								<Flex center full>
									<H4 align="center" margin="0">
										{t('Check your email for instructions')}
									</H4>
								</Flex>
							) : (
								<>
									<H1 weight="600" align="center" margin="0 0 20px">
										{t('Recover Password')}
									</H1>

									<H5 opacity="1" align="center" padding="0 0 50px">
										{t('Enter your e-mail address to reset your password')}
									</H5>

									<FormInput name="username" label="Enter E-mail" validate={required} />

									<ErrorText center formError={formError} />

									<Button type="submit" text={t('Send E-mail')} loading={loading} />

									<Link to="/login">
										<Button buttonType="text" text={t('Back to Login')} padding="20px" />
									</Link>
								</>
							)}
						</BlockStyled>
					</Form>
				</FlexItem>
			</Flex>
		</>
	);
};

export default Forgot;
