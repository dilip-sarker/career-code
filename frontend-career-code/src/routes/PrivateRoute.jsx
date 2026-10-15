import React, { use } from 'react';
import AuthContext from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../pages/Shared/Loading';

const PrivateRoute = ({ children }) => {
	const { user, loading } = use(AuthContext);
	const location = useLocation();
	if (loading) {
		return <Loading></Loading>;
	}

	// console.log(location.pathname);
	if (!user) {
		return <Navigate to="/signin" state={location.pathname}></Navigate>;
	}
	return children;
};

export default PrivateRoute;
