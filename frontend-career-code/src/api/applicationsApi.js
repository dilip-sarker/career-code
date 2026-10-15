import axios from 'axios';

export const myApplicationsPromise = async (email) => {
	return axios
		.get(`http://localhost:5000/applications?email=${email}`, {
			withCredentials: true,
		})
		.then((res) => res.data);
};
