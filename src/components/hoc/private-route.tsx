import { Navigate, useLocation } from 'react-router-dom';

import { userStore, userSelectors } from '@/store/user';
import LoadingLarge from '@/components/shared/loading-large';
import { FC } from '@/types';

const PrivateRoute: FC = ({ children }) => {
	const location = useLocation();
	const isLoggedIn = userStore(userSelectors.isLoggedIn);
	const loading = userStore(userSelectors.loading);

	if (loading) return <LoadingLarge loading={loading} />;

	if (!isLoggedIn && !loading) return <Navigate replace to="/login" state={{ from: location }} />;

	return <>{children}</>;
};

export default PrivateRoute;
