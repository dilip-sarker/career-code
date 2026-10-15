import React from 'react';
import { useLoaderData, useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const ViewApplications = () => {
	const { id } = useParams();
	const applications = useLoaderData();
	// console.log(applications);
	const handleStatusChange = (e, applicationId) => {
		console.log(e.target.value, applicationId);
		axios
			.patch(`http://localhost:5000/applications/${applicationId}`, {
				status: e.target.value,
			})
			.then((res) => {
				if (res.data.modifiedCount) {
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Application status updated successfully!',
						showConfirmButton: false,
						timer: 1500,
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div>
			<h3>
				{applications.length} applications for: {id}
			</h3>
			<div className="overflow-x-auto">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						{applications.map((application, index) => (
							<tr key={application._id}>
								<th>{index + 1}</th>
								<td>{application.applicant}</td>
								<td>
									<select
										onChange={(e) => handleStatusChange(e, application._id)}
										defaultValue={application.status}
										className="select"
									>
										<option disabled={true}>Update Status</option>
										<option>Pending</option>
										<option>Interview</option>
										<option>Hired</option>
										<option>Rejected</option>
									</select>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ViewApplications;
