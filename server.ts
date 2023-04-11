import fs from 'fs';
import path from 'path';

import Koa from 'koa';
import koaConnect from 'koa-connect';
import { createServer as createViteServer, ViteDevServer } from 'vite';

import colors from 'colors';
import child_process from 'child_process';

const SERVER_PORT = 2333;
const SERVER_HTML_ERROR = 'server_html_error';

const IS_PROP: boolean = process.env.NODE_ENV === 'production';

async function createAppServer() {
	const resolve = (p: string) => path.resolve(__dirname, p);

	const app = new Koa();

	let vite: ViteDevServer;
	if (!IS_PROP) {
		vite = await createViteServer({ server: { middlewareMode: 'ssr' } });
		app.use(koaConnect(vite.middlewares));
	} else {
		app.use((await import('koa-compress')).default());
		app.use(
			(await import('koa-static')).default(resolve('dist/client'), {
				index: false
			})
		);
	}

	app.use(async (ctx, _next) => {
		const { req } = ctx;
		const { url } = req;

		try {
			let template: string;
			let render;

			if (!IS_PROP) {
				template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
				template = await vite.transformIndexHtml(url || '', template);
				render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
			} else {
				template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8');
				render = (await import(resolve('dist/server/entry-server.js'))).render;
			}
			const context: { preloadedState?: string } = {};
			const appHtml = await render(url, context);

			let html = template;

			if (context.preloadedState) {
				html = html.replace(
					'//--script-paclcehoder--//',
					`window.PRE_LOADED_STATE = ${JSON.stringify(context.preloadedState)}`
				);
			}

			html = html.replace('<!--app-html-->', appHtml);

			ctx.body = html;
			ctx.status = 200;
		} catch (e: any) {
			if (!IS_PROP) {
				vite.ssrFixStacktrace(e);
			}
			ctx.app.emit('error', new Error(SERVER_HTML_ERROR), ctx, e);
		}
	});

	app.on('error', (err, ctx, e) => {
		if (err.message === SERVER_HTML_ERROR) {
			const msg = `[app.on(error)]: ${e.stack}`;
			console.error(colors.red(msg));
			ctx.status = 500;
			ctx.body = msg;
		} else {
			const msg = `[app else error]: ${e}`;
			console.error(colors.red(msg));
			ctx.status = 500;
			ctx.body = msg;
		}
	});

	app.listen(SERVER_PORT, () => {
		const url = `http://localhost:${SERVER_PORT}`;
		console.log(colors.green('[React SSR] '), colors.green.underline(url));
		child_process.exec(`open ${url}`);
	});
}

createAppServer();
