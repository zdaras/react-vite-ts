import { hydrate } from 'react-dom';

import Index from '@/index';
import { appStore } from '@/store/app';
import '@/services/locale/i18n';

appStore.getState().initApp();

hydrate(<Index />, document.getElementById('app'));
