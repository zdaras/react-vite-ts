/// <reference types="vitest" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_PORT: string;
	readonly VITE_API_BASE_URL: string;
	readonly VITE_AUTH_TOKEN: string;
	readonly VITE_BUILD_MODE: string;
	readonly VITE_GRAPHQL_ENDPOINT: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
