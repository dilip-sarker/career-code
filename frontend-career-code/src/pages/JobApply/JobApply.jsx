import React from 'react';
import { Link, useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const JobApply = () => {
	const { id: jobId } = useParams();
	const { user } = useAuth();
	console.log(user);
	const handleApplyFormSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		const { linkedIn, github, resume } = Object.fromEntries(formData.entries());
		const application = {
			jobId,
			applicant: user.email,
			linkedIn,
			github,
			resume,
		};

		axios
			.post('http://localhost:5000/applications', application)
			.then((res) => {
				// console.log(res.data);
				if (res.data.insertedId) {
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Congrats! Your application successfully submitted.',
						showConfirmButton: false,
						timer: 1500,
					});
					form.reset();
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div className="m-5">
			<h3 className="text-2xl">
				Apply for this job: <Link to={`/jobs/${jobId}`}>Details</Link>
			</h3>
			<form onSubmit={handleApplyFormSubmit} className="m-5">
				<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
					<legend className="fieldset-legend">Please Provide Your Info</legend>
					<label className="label">Email</label>
					<input
						type="email"
						name="email"
						className="input"
						defaultValue={user?.email}
						readOnly
						disabled
					/>
					<label className="label">LinkedIn Link</label>
					<input
						type="url"
						name="linkedIn"
						className="input"
						placeholder="LinkedIn Link"
					/>

					<label className="label">GitHub Link</label>
					<input
						type="url"
						name="github"
						className="input"
						placeholder="GitHub Link"
					/>

					<label className="label">Resume Link</label>
					<input
						type="url"
						name="resume"
						className="input"
						placeholder="Resume Link"
					/>
					<input type="submit" className="btn btn-primary" value="Apply" />
				</fieldset>
			</form>
		</div>
	);
};

export default JobApply;
