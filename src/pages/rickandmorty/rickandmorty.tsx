import { useMemo } from 'react';
import Helmet from '@/components/shared/helmet';
import Table, { Row, Cell } from '@/components/library/table';
import LoadingTable from '@/components/shared/loading-table';
import Button from '@/components/library/button';
import { Container } from '@/styled/shared';
import { Flex } from '@/styled/flex';
import { useTranslation, useGQuery } from '@/hooks';
import { GET_CHARACTERS_ARGS } from '@/services/graphql/query/rickandmorty';

const RickAndMorty = () => {
	const { t } = useTranslation();
	const initialData = useMemo(() => ({ characters: { info: { prev: null, next: null }, results: [] as any[] } }), []);
	const { data = initialData, loading, refetch } = useGQuery(...GET_CHARACTERS_ARGS);

	const fetchPrevPage = () => refetch({ page: data.characters.info.prev });

	const fetchNextPage = () => refetch({ page: data.characters.info.next });

	return (
		<>
			<Helmet title={t('Rick and Morty')} />

			<Container height="100%">
				<Flex align="center" direction="column">
					<Flex width="860px" height="601px" direction="column">
						{loading ? (
							<LoadingTable withCircle padding="10px 0" loading={loading} />
						) : (
							<Table
								data={data.characters.results}
								overflow="auto"
								showHeader={false}
								renderBody={(item, index) => (
									<Row key={`${item.name}${index}`}>
										<Cell width="100px">
											<div style={{ borderRadius: '3rem', overflow: 'hidden', width: '39px', height: '39px' }}>
												<img src={item.image} alt="icon" style={{ maxWidth: '39px' }} />
											</div>
										</Cell>
										<Cell>{item.name}</Cell>
										<Cell>{item.species}</Cell>
										<Cell>{item.status}</Cell>
									</Row>
								)}
							/>
						)}
					</Flex>

					<Flex justify="space-between" width="200px" padding="30px 0 0">
						<Button buttonType="text" text="Prev" hidden={!data.characters.info.prev} onClick={fetchPrevPage} />
						<Button buttonType="text" text="Next" hidden={!data.characters.info.next} onClick={fetchNextPage} />
					</Flex>
				</Flex>
			</Container>
		</>
	);
};

export default RickAndMorty;
