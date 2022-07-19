import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import config from '@/utils/config';

export const authLink = () => {
	let token: any = null;
	const setToken = async (t?: any) => {
		token = t;
		return Promise.resolve();
	};

	return {
		setToken,
		context: setContext((_req, { headers }) => ({
			headers: {
				...headers,
				...(token && { [config.AUTH_TOKEN]: `Bearer ${token}` })
			}
		}))
	};
};

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

const httpLink = new HttpLink({ uri: config.GRAPHQL_ENDPOINT, credentials: 'include' });

const client = new ApolloClient({
	cache: new InMemoryCache({ addTypename: false }),
	link: from([authLink().context, errorLink, httpLink])
});

export const setAuthToken = async (t?: any) =>
	new Promise(resolve => {
		const newAuthLink = authLink();
		newAuthLink.setToken(t);
		client.setLink(from([newAuthLink.context, errorLink, httpLink]));
		resolve(null);
	});

export default client;
