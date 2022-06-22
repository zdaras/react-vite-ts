import { resolve } from 'path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import viteCompression from 'vite-plugin-compression';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const testConfig = { globals: true, environment: 'jsdom', setupFiles: './test/setup.ts' };

export default defineConfig(({ command }) => {
	if (command === 'serve') {
		return {
			publicDir: 'src/assets/root',
			resolve: {
				alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
			},
			plugins: [react(), tsconfigPaths(), svgr()],
			test: testConfig
		};
	}

	return {
		build: {
			chunkSizeWarningLimit: 1024 // 1MB
		},
		resolve: {
			alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
		},
		plugins: [
			react(),
			tsconfigPaths(),
			svgr(),
			splitVendorChunkPlugin(),
			viteCompression({ verbose: false, algorithm: 'gzip' }), // no console output
			viteCompression({ verbose: false, algorithm: 'brotliCompress' }),
			viteStaticCopy({
				targets: [
					{
						src: 'src/assets/icons/**/*',
						dest: 'src/assets/icons'
					},
					{
						src: 'src/assets/root/*',
						dest: ''
					}
				]
			})
		],
		test: testConfig
	};
});
