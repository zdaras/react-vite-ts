import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { matchRoutes, RouteMatch } from 'react-router-dom';

import { routes } from '@/router/routes';
import App from '@/index';

export const render = async (url: string, context: any) => {
	const routeMatch = matchRoutes(routes, url);
	await getServerData(routeMatch);
	updateContext(context, routeMatch);

	return renderToString(
		<StaticRouter location={url}>
			<App />
		</StaticRouter>
	);
};

const updateContext = (context: any, routeMatch: RouteMatch<string>[] | null, storeState = {}) => {
	context.status = routeMatch ? 200 : 400;
	context.preloadedState = storeState;
};

const getServerData = async (routeMatch: RouteMatch<string>[] | null) => {
	if (routeMatch) {
		const { route } = routeMatch[routeMatch.length - 1];
		const getInitialProps = (route.element as any)?.type?.getInitialProps;
		if (getInitialProps) {
			const ctx = {};
			const data = await getInitialProps(ctx);

			return data;
		}
	}
	return null;
};
