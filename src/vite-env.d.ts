/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_PORT: string;
	readonly VITE_API_BASE_URL: string;
	readonly VITE_AUTH_TOKEN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
