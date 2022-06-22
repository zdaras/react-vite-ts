import { Provider } from 'react-redux';

import App from '@/router/app';
import { store } from '@/store';
import { appActions } from '@/store/ducks/app';
import '@/services/locale/i18n';

store.dispatch<any>(appActions.initApp());

const Index = ({ store: st }: any) => (
	<Provider store={st}>
		<App />
	</Provider>
);

export default Index;
