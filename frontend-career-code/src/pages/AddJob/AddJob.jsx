import React from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddJob = () => {
	const { user } = useAuth();
	const handleAddJob = (e) => {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());
		// process salary range data
		const { min_salary, max_salary, currency, ...newJob } = data;
		newJob.salaryRange = { min_salary, max_salary, currency };
		// process requirements
		newJob.requirements = newJob.requirements
			.split(',')
			.map((req) => req.trim());
		// process responsibilities
		newJob.responsibilities = newJob.responsibilities
			.split(',')
			.map((responsibility) => responsibility.trim());

		newJob.status = 'active';
		axios
			.post('http://localhost:5000/job', newJob)
			.then((res) => {
				console.log(res);
				if (res.data.insertedId) {
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Job Successfully Added!',
						showConfirmButton: false,
						timer: 1500,
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
		console.log(newJob);
	};

	return (
		<div>
			<h3 className="text-2xl text-center m-3 text-yellow-400">Add a Job</h3>
			<div className="flex justify-center items-center">
				<form onSubmit={handleAddJob}>
					<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
						<legend className="fieldset-legend">Basic Info</legend>

						<label className="label">Job Title</label>
						<input
							type="text"
							name="title"
							className="input w-full"
							placeholder="Job Title"
						/>

						<label className="label">Company</label>
						<input
							type="text"
							name="company"
							className="input w-full"
							placeholder="Company Name"
						/>

						<label className="label">Location</label>
						<input
							type="text"
							name="location"
							className="input w-full"
							placeholder="Company Location"
						/>
						<label className="label">Company Logo</label>
						<input
							type="text"
							name="company_logo"
							className="input w-full"
							placeholder="Company Logo Url"
						/>
					</fieldset>
					{/* Job Type */}
					<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
						<legend className="fieldset-legend">Job Type</legend>
						<div className="filter">
							<input
								className="btn filter-reset"
								type="radio"
								name="jobType"
								aria-label="All"
							/>
							<input
								className="btn"
								type="radio"
								name="jobType"
								value="Remote"
								aria-label="Remote"
							/>
							<input
								className="btn"
								type="radio"
								name="jobType"
								value="On-Site"
								aria-label="On-Site"
							/>
							<input
								className="btn"
								type="radio"
								name="jobType"
								value="Hybrid"
								aria-label="Hybrid"
							/>
						</div>
					</fieldset>
					{/* Job Category */}
					<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
						<legend className="fieldset-legend">Job Category</legend>
						<select
							defaultValue="Job Category"
							name="category"
							className="select"
						>
							<option disabled={true}>Job Category</option>
							<option>Engineering</option>
							<option>Marketing</option>
							<option>Finance</option>
						</select>
					</fieldset>
					{/* Application Deadline */}
					<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
						<legend className="fieldset-legend">Application Deadline</legend>
						<input type="date" name="deadline" className="" id="" />
					</fieldset>
					{/* Salary Range */}
					<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
						<legend className="fieldset-legend">Salary Range</legend>
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
							<div>
								<label className="label">Minimum Salary</label>
								<input
									type="text"
									className="input"
									name="min"
									placeholder="Minimum Salary"
								/>
							</div>

							<div>
								<label className="label">Maximum Salary</label>
								<input
									type="text"
									className="input"
									name="max"
									placeholder="Maximum Salary"
								/>
							</div>

							<div>
								<label className="label">Currency</label>
								<select
									defaultValue="Select a Currency"
									name="currency"
									className="select"
								>
									<option disabled={true}>Select a Currency</option>
									<option>BDT</option>
									<option>USD</option>
									<option>EU</option>
								</select>
							</div>
						</div>
					</fieldset>
					{/* Job Description */}
					<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
						<legend className="fieldset-legend">Job Description</legend>
						<textarea
							className="textarea w-full"
							placeholder="Job Description"
							name="description"
						></textarea>
					</fieldset>
					{/* Job Requirements */}
					<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
						<legend className="fieldset-legend w-full">Job Requirements</legend>
						<textarea
							className="textarea w-full"
							placeholder="Job Requirements (Separate by comma)"
							name="requirements"
						></textarea>
					</fieldset>
					{/* Job Responsibilities */}
					<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
						<legend className="fieldset-legend">Job Responsibilities</legend>
						<textarea
							className="textarea w-full"
							placeholder="Job Responsibilities (Separate by comma)"
							name="responsibilities"
						></textarea>
					</fieldset>
					{/* HR Related Info */}
					<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
						<legend className="fieldset-legend">HR Related Info</legend>

						<label className="label">HR Name</label>
						<input
							type="text"
							name="hr_name"
							className="input w-full"
							placeholder="HR Name"
						/>
						<label className="label">HR Email</label>
						<input
							type="email"
							name="hr_email"
							defaultValue={user?.email}
							readOnly
							className="input w-full"
							placeholder="HR Email"
						/>
					</fieldset>
					<input
						type="submit"
						value="Add Job"
						className="btn btn-outline block mx-auto m-2"
					/>
				</form>
			</div>
		</div>
	);
};

export default AddJob;
