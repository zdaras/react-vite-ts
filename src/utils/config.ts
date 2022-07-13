export default {
	PORT: import.meta.env.VITE_PORT,
	API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
	AUTH_TOKEN: import.meta.env.VITE_AUTH_TOKEN,
	isDev: import.meta.env.VITE_BUILD_MODE === 'development' || !import.meta.env.VITE_BUILD_MODE,
	isTestBuild: import.meta.env.VITE_BUILD_MODE === 'test',
	isProd: import.meta.env.VITE_BUILD_MODE === 'production',
	GRAPHQL_ENDPOINT: import.meta.env.VITE_GRAPHQL_ENDPOINT
};
