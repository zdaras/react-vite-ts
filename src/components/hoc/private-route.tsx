import { Navigate, useLocation } from 'react-router-dom';

import { userStore } from '@/store/user';
import LoadingLarge from '@/components/shared/loading-large';
import { FC } from '@/types';

const PrivateRoute: FC = ({ children }) => {
	const location = useLocation();
	const isLoggedIn = userStore(store => store.isLoggedIn);
	const loading = userStore(store => store.loading);

	if (loading) return <LoadingLarge loading={loading} />;

	if (!isLoggedIn && !loading) return <Navigate replace to="/login" state={{ from: location }} />;

	return <>{children}</>;
};

export default PrivateRoute;
