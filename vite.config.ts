import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	resolve: { alias: [{ find: '@', replacement: resolve(__dirname, 'src') }] },
	plugins: [
		react(),
		tsconfigPaths(),
		svgr(),
		viteStaticCopy({
			targets: [
				{
					src: 'src/assets/icons/**/*',
					dest: 'src/assets/icons'
				}
			]
		})
	]
});
