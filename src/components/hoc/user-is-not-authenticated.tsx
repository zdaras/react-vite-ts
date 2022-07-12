import { Navigate } from 'react-router-dom';

import { userStore, userSelectors } from '@/store/user';
import LoadingLarge from '@/components/shared/loading-large';
import { FC } from '@/types';

const UserIsNotAuth: FC = ({ children }) => {
	const isLoggedIn = userStore(userSelectors.isLoggedIn);
	const loading = userStore(userSelectors.loading);

	if (loading) return <LoadingLarge loading={loading} />;

	if (isLoggedIn && !loading) return <Navigate to="/" />;

	return <>{children}</>;
};

export default UserIsNotAuth;
