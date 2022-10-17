import Helmet from '@/components/shared/helmet';
import Button from '@/components/library/button';
import { H4, Container } from '@/styled/shared';
import { Flex } from '@/styled/flex';
import { numberToFixed } from '@/utils/number';
import Api from '@/services/api';
import { useQuery, useTranslation } from '@/hooks';

const Dashboard = () => {
	const { t } = useTranslation();
	const { data, isFetching, refetch } = useQuery(Api.ticker.getAsset, { params: { coin: 'bitcoin' } });

	return (
		<>
			<Helmet title={t('Dashboard')} />

			<Container height="100%">
				<Flex center height="100%" direction="column">
					<Button inline buttonType="text" onClick={() => refetch({ coin: 'bitcoin' })}>
						<H4>Bitcoin</H4>
					</Button>
					<Button inline buttonType="text" margin="20px 0 0" onClick={() => refetch({ coin: 'ethereum' })}>
						<H4>Ethereum</H4>
					</Button>
					<Button inline buttonType="text" margin="20px 0" onClick={() => refetch({ coin: 'solana' })}>
						<H4>Solana</H4>
					</Button>
					<H4 padding="30px 0">{isFetching ? 'Loading...' : <>$ {numberToFixed(data.data?.priceUsd, 2)}</>}</H4>
				</Flex>
			</Container>
		</>
	);
};

export default Dashboard;
