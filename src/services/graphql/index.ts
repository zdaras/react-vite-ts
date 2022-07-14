import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import config from '@/utils/config';

const authLink = setContext((_req, { headers }) => {
	const token = localStorage.getItem('token');
	return {
		headers: {
			...headers,
			...(token && { [config.AUTH_TOKEN]: `Bearer ${token}` })
		}
	};
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, path }) => console.error(`[GraphQL error]: ${message}, Path: ${path}`));

		graphQLErrors.forEach(err => {
			if (err.extensions.code === 'UNAUTHENTICATED') {
				const oldHeaders = operation.getContext().headers;
				const newToken = '';
				operation.setContext({ headers: { ...oldHeaders, authorization: newToken } });
			}
			return forward(operation);
		});
	}
	if (networkError) console.error(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({ uri: config.GRAPHQL_ENDPOINT });

const client = new ApolloClient({
	cache: new InMemoryCache({ addTypename: false }),
	link: from([authLink, errorLink, httpLink])
});

export default client;
