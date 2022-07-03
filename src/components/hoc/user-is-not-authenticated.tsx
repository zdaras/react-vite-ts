import { Navigate } from 'react-router-dom';

import { userStore } from '@/store/user';
import LoadingLarge from '@/components/shared/loading-large';
import { FC } from '@/types';

const UserIsNotAuth: FC = ({ children }) => {
	const isLoggedIn = userStore(store => store.isLoggedIn);
	const loading = userStore(store => store.loading);

	if (loading) return <LoadingLarge loading={loading} />;

	if (isLoggedIn && !loading) return <Navigate to="/" />;

	return <>{children}</>;
};

export default UserIsNotAuth;
