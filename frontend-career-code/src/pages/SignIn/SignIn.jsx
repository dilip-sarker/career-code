import Lottie from 'lottie-react';
import React, { use } from 'react';
import SignInLottie from '../../assets/lotties/signIn.json';
import AuthContext from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
import { NavLink, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../Shared/SocialLogin';

const SignIn = () => {
	const { signInUser, setLoading } = use(AuthContext);

	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state || '/';

	const handleSignIn = (e) => {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value;
		const password = form.password.value;
		console.log(email, password);
		signInUser(email, password)
			.then((res) => {
				const user = res.user;
				if (res.user) {
					setLoading(false);
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Successfully Logged In!',
						showConfirmButton: false,
						timer: 1500,
					});
					navigate(from);
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
						animationData={SignInLottie}
						loop={true}
					></Lottie>
				</div>
				<div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
					<div className="card-body">
						<h1 className="text-5xl font-bold">Sign in now!</h1>
						<form onSubmit={handleSignIn}>
							<fieldset className="fieldset">
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

								<button className="btn btn-neutral mt-4">Sign In</button>
							</fieldset>
							<p>
								Don't have an account?{' '}
								<NavLink to="/register" className="text-yellow-500">
									Register
								</NavLink>
							</p>
						</form>
						<SocialLogin from={from}></SocialLogin>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
