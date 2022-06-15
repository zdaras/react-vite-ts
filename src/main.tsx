import { createRoot } from 'react-dom/client';

import { store } from '@/store';
import Index from '@/index';

createRoot(document.getElementById('app') as Element).render(<Index store={store} />);
