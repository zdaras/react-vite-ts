import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { FC } from '@/types';

const queryClient = new QueryClient();

const Provider: FC = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

export default Provider;
