import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import SignIn from '../pages/SignIn/SignIn';
import Loading from '../pages/Shared/Loading';
import JobDetails from '../pages/JobDetails/JobDetails';
import PrivateRoute from '../routes/PrivateRoute';
import JobApply from '../pages/JobApply/JobApply';
import MyApplications from '../pages/MyApplications/MyApplications';
import AddJob from '../pages/AddJob/AddJob';
import MyPostedJobs from '../pages/MyPostedJobs/MyPostedJobs';
import ViewApplications from '../pages/ViewApplications/ViewApplications';

const router = createBrowserRouter([
	{
		path: '/',
		Component: RootLayout,
		children: [
			{
				index: true,
				hydrateFallbackElement: <Loading></Loading>,
				loader: () => fetch('http://localhost:5000/jobs'),
				Component: Home,
			},
			{
				path: '/jobs/:id',
				hydrateFallbackElement: <Loading></Loading>,
				loader: ({ params }) =>
					fetch(`http://localhost:5000/jobs/${params.id}`),
				Component: JobDetails,
			},
			{
				path: '/job-apply/:id',
				hydrateFallbackElement: <Loading></Loading>,
				loader: ({ params }) =>
					fetch(`http://localhost:5000/jobs/${params.id}`),
				element: (
					<PrivateRoute>
						<JobApply></JobApply>
					</PrivateRoute>
				),
			},
			{
				path: '/my-applications',
				hydrateFallbackElement: <Loading></Loading>,
				element: (
					<PrivateRoute>
						<MyApplications></MyApplications>
					</PrivateRoute>
				),
			},
			{
				path: '/add-job',
				hydrateFallbackElement: <Loading></Loading>,
				element: (
					<PrivateRoute>
						<AddJob></AddJob>
					</PrivateRoute>
				),
			},
			{
				path: '/my-posted-jobs',
				hydrateFallbackElement: <Loading></Loading>,
				element: (
					<PrivateRoute>
						<MyPostedJobs></MyPostedJobs>
					</PrivateRoute>
				),
			},
			{
				path: '/applications/:id',
				hydrateFallbackElement: <Loading></Loading>,
				element: (
					<PrivateRoute>
						<ViewApplications></ViewApplications>
					</PrivateRoute>
				),
				loader: ({ params }) =>
					fetch(`http://localhost:5000/applications/job/${params.id}`),
			},
			{
				path: '/register',
				Component: Register,
			},
			{
				path: '/signin',
				Component: SignIn,
			},
		],
	},
]);

export default router;
