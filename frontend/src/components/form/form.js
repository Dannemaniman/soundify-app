import './form.css';
import { useState } from 'react';

const Form = () => {
	const defaultValues = {
		user_name: '',
		email: '',
		password: '',
	};

	const [newUser, setNewUser] = useState(defaultValues);

	//Här skickar vi objektet till backend genom en post antar jag eller något sådant:
	// fetch("/home", { method: post, headers: { 'Content-type': "application/json" }, body: JSON.stringify(newUser) }).then(res => res.json()).then(data => console.log(data))

	async function saveNewUser() {
		fetch('/api/user/register', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(newUser),
		})
			.then((res) => res.json())
			.then((data) => console.log(data));
	}

	const handelSubmit = (event) => {
		saveNewUser();
		event.preventDefault();
	};

	return (
		<form onSubmit={handelSubmit} className='formContainer'>
			<label className='labelContainer'>
				<h1>Sign up</h1>
				<h4>Username</h4>
				<input
					type='text'
					name='username'
					value={newUser.user_name}
					onChange={(e) => {
						setNewUser({ ...newUser, user_name: e.target.value });
					}}
				/>
				<h4>Email</h4>
				<input
					type='email'
					name='email'
					value={newUser.email}
					onChange={(e) => {
						setNewUser({ ...newUser, email: e.target.value });
					}}
				/>
				<h4>Password</h4>
				<input
					type='password'
					name='password'
					value={newUser.password}
					onChange={(e) => {
						setNewUser({ ...newUser, password: e.target.value });
					}}
				/>
				<h4>Confirm password</h4>
				<input type='password' name='confirmpassword' />
			</label>
			<input type='submit' value='Continue' className='submitBtn' />

			<div className='iconBar'>
				<div className='icons'>
					<i className='fab fa-facebook-f'></i>
				</div>
				<div className='icons'>
					<i className='fab fa-twitter'></i>
				</div>
				<div className='icons'>
					<i className='fab fa-google'></i>
				</div>
			</div>
			<div className='login'>
				<h3>
					Already have an account? <a href='/login'>Login</a>
				</h3>
			</div>
		</form>
	);
};

export default Form;
