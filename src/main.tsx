import { createRoot } from 'react-dom/client';

import Index from '@/index';
import { appStore } from '@/store/app';
import '@/services/locale/i18n';

appStore.getState().initApp();
createRoot(document.getElementById('app') as Element).render(<Index />);
