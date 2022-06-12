import Helmet from '@/components/shared/helmet';
import { H4, Container } from '@/styled/shared';
import { Flex } from '@/styled/flex';
import { numberToFixed } from '@/utils/number';
import Api from '@/services/api';
import { useApi, useTranslation } from '@/hooks';

const Dashboard = () => {
	const { t } = useTranslation();
	const {
		data: { data = { name: '', priceUsd: '' } }
	} = useApi(Api.ticker.getAsset, { coin: 'bitcoin' });

	return (
		<>
			<Helmet title={t('Dashboard')} />

			<Container height="100%">
				<Flex center height="100%" direction="column">
					<H4>{data.name}</H4>
					<H4 padding="30px 0">$ {numberToFixed(data.priceUsd, 2)}</H4>
				</Flex>
			</Container>
		</>
	);
};

export default Dashboard;
