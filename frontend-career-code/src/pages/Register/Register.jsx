import Lottie from 'lottie-react';
import React, { use } from 'react';
import RegisterLottie from '../../assets/lotties/register.json';
import AuthContext from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router';
import SocialLogin from '../Shared/SocialLogin';

const Register = () => {
	const { createUser, setLoading, setUser, updateUser } = use(AuthContext);
	const navigate = useNavigate();
	const handleRegister = (e) => {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		const { name, photo, email, password } = Object.fromEntries(
			formData.entries()
		);
		console.log(name, photo, email, password);
		createUser(email, password)
			.then((res) => {
				const user = res.user;
				updateUser({
					displayName: name,
					photoURL: photo,
				})
					.then(() => {
						setUser({ ...user, displayName: name, photoURL: photo });
					})
					.catch((err) => {
						console.error(err);
						setUser(user);
					});
				if (res.user) {
					setLoading(false);
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Your account has been created successfully!',
						showConfirmButton: false,
						timer: 1500,
					});
					navigate('/');
				}
				console.log(user);
			})
			.catch((err) => {
				console.error(err);
			});
	};
	return (
		<div className="hero bg-base-200 min-h-screen">
			<div className="hero-content flex-col lg:flex-row-reverse">
				<div className="text-center lg:text-left">
					<Lottie
						style={{ width: '200px' }}
						animationData={RegisterLottie}
						loop={true}
					></Lottie>
				</div>
				<div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
					<div className="card-body">
						<h1 className="text-5xl font-bold">Register now!</h1>
						<form onSubmit={handleRegister}>
							<fieldset className="fieldset">
								<label className="label">Name</label>
								<input
									type="text"
									name="name"
									className="input"
									placeholder="Name"
								/>
								<label className="label">Photo</label>
								<input
									type="text"
									name="photo"
									className="input"
									placeholder="Photo Url"
								/>
								<label className="label">Email</label>
								<input
									type="email"
									name="email"
									className="input"
									placeholder="Email"
								/>
								<label className="label">Password</label>
								<input
									type="password"
									name="password"
									className="input"
									placeholder="Password"
								/>

								<button className="btn btn-neutral mt-4">Register</button>
							</fieldset>
							<p>
								Already have an account?{' '}
								<NavLink to="/signin" className="text-orange-600">
									Sign In
								</NavLink>
							</p>
						</form>
						<SocialLogin></SocialLogin>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
