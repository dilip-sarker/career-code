import React from 'react';
import { Link, useLoaderData } from 'react-router';

const JobDetails = () => {
	const { _id, title, company } = useLoaderData();

	return (
		<div>
			<h3 className="text-3xl m-3">Job details of: {title}</h3>
			<p>Company: {company}</p>
			<Link to={`/job-apply/${_id}`}>
				<button className="btn btn-primary m-3">Apply Now</button>
			</Link>
		</div>
	);
};

export default JobDetails;
