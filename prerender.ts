import fs from 'fs';
import path from 'path';

const absolute = (p: string) => path.resolve(__dirname, p);

const template: string = fs.readFileSync(absolute('dist/static/index.html'), 'utf-8');

const routesToPrerender = fs.readdirSync(absolute('src/pages')).map(file => {
	const name = file.replace(/\.tsx$/, '').toLowerCase();
	return name === 'home' ? `/` : `/${name}`;
});

async function prerender() {
	const { render } = await import(absolute('dist/server/entry-server.js'));

	for (const url of routesToPrerender) {
		const context = {};
		const appHtml = await render(url, context);

		const html = template.replace(`<!--app-html-->`, appHtml);

		const filePath = `dist/static${url === '/' ? '/index' : url}.html`;
		fs.writeFileSync(absolute(filePath), html);
		console.log('pre-rendered:', filePath);
	}
}

prerender();
