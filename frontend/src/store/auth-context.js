import React, { useState } from 'react';

const AuthContext = React.createContext({
	isLoggedIn: '',
	user: {},
	setUserHandler: (user) => {},
	loginHandler: (email, password) => {},
	logoutHandler: (token) => {},
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setuser] = useState(null);

	const loginHandler = async (email, password) => {
		const data = { email, password };
		try {
			await fetch('/api/user/login', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify(data),
			})
				.then((data) => {
					console.log(data);
					return data.json();
				})
				.then((message) => console.log(message));
		} catch (err) {
			console.log(err);
		}
		setIsLoggedIn(true);
	};

	const logoutHandler = async () => {
		let response = await fetch('/api/user/logout', {
			method: 'POST',
		});
		setIsLoggedIn(false);
	};

	const setUserHandler = (data) => {
		setuser(data.user);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				user: user,
				setUserHandler: setUserHandler,
				loginHandler: loginHandler,
				logoutHandler: logoutHandler,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
