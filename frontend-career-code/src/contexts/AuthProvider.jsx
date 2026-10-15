import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const updateUser = (updatedData) => {
		return updateProfile(auth.currentUser, updatedData);
	};

	const signInUser = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const signInWithGoogle = () => {
		return signInWithPopup(auth, googleProvider);
	};

	const signOutUser = () => {
		setLoading(true);
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			// console.log('has current user:', currentUser?.email);
			if (currentUser?.email) {
				const userData = { email: currentUser.email };
				axios
					.post('http://localhost:5000/jwt', userData, {
						withCredentials: true,
					})
					.then((res) => {
						console.log('token after jwt', res.data);
					})
					.catch((error) => {
						console.error(error);
					});
			}
			setLoading(false);
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const authInfo = {
		loading,
		setLoading,
		user,
		setUser,
		createUser,
		updateUser,
		signInUser,
		signInWithGoogle,
		signOutUser,
	};

	return (
		<div>
			<AuthContext value={authInfo}>{children}</AuthContext>
		</div>
	);
};

export default AuthProvider;
