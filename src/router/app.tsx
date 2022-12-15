import { Routes, Route, BrowserRouter } from 'react-router-dom';

import ThemeProvider from '@/styled/theme-provider';
import ToastContainer from '@/components/library/toast';
import ErrorBoundary from '@/components/hoc/error-boundary';
import { appStore, appSelectors } from '@/store/app';
import { routes } from '@/router/routes';
import ReactQueryProvider from '@/services/react-query/provider';

const App = () => {
	const theme = appStore(appSelectors.theme);

	return (
		<ErrorBoundary>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<ReactQueryProvider>
						<ToastContainer />
						<Routes>
							{routes.map(({ path, AuthCheck, Layout, Component }) => (
								<Route
									key={path}
									path={path}
									element={
										<AuthCheck>
											<Layout>
												<Component />
											</Layout>
										</AuthCheck>
									}
								/>
							))}
						</Routes>
					</ReactQueryProvider>
				</ThemeProvider>
			</BrowserRouter>
		</ErrorBoundary>
	);
};

export default App;
