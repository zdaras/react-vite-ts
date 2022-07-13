import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import ThemeProvider from '@/styled/theme-provider';
import ToastContainer from '@/components/library/toast';
import { appStore } from '@/store/app';
import { routes } from '@/router/routes';
import client from '@/services/graphql';

const App = () => {
	const theme = appStore(state => state.theme);

	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<>
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
					</>
				</ThemeProvider>
			</BrowserRouter>
		</ApolloProvider>
	);
};

export default App;
