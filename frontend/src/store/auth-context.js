import React, { useState } from 'react';

const AuthContext = React.createContext({
	isLoggedIn: '',
	loginHandler: (email, password) => {},
	logoutHandler: (token) => {},
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				loginHandler: loginHandler,
				logoutHandler: logoutHandler,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
