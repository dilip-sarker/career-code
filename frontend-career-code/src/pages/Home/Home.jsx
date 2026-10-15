import React from 'react';
import Banner from './Banner';
import HotJobs from './HotJobs';
import { useLoaderData } from 'react-router';

const Home = () => {
	const jobs = useLoaderData();

	return (
		<div>
			<Banner></Banner>
			<HotJobs jobs={jobs}></HotJobs>
		</div>
	);
};

export default Home;
