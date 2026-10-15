import React, { Suspense } from 'react';
import ApplicationStats from './ApplicationStats';
import ApplicationList from './ApplicationList';
import Loading from '../Shared/Loading';
import useAuth from '../../hooks/useAuth';
import { myApplicationsPromise } from '../../api/applicationsApi';

const MyApplications = () => {
	const { user } = useAuth();

	return (
		<div>
			<h3>my applications</h3>
			<ApplicationStats></ApplicationStats>
			<Suspense fallback={<Loading></Loading>}>
				<ApplicationList
					myApplicationsPromise={myApplicationsPromise(user.email)}
				></ApplicationList>
			</Suspense>
		</div>
	);
};

export default MyApplications;
