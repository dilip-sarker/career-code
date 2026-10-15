import JobCard from '../Shared/JobCard';

const HotJobs = ({ jobs }) => {
	console.log(jobs);
	return (
		<div>
			<h2 className="text-4xl text-center text-green-400 m-5">
				Hot Jobs of the day!
			</h2>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
				{jobs.map((job) => (
					<JobCard key={job._id} job={job}></JobCard>
				))}
			</div>
		</div>
	);
};

export default HotJobs;
