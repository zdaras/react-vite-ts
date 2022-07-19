import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import config from '@/utils/config';

const httpLink = new HttpLink({ uri: config.GRAPHQL_ENDPOINT_SECONDARY });

const client = new ApolloClient({
	cache: new InMemoryCache({ addTypename: false }),
	link: httpLink
});

export default client;
