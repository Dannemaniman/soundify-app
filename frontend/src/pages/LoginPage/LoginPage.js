import styles from './LoginPage.module.scss';
import facebookLogo from '../../assets/icons/facebook.png';
import twitterLogo from '../../assets/icons/twitter.png';
import googleLogo from '../../assets/icons/google.png';
import { useContext, useRef } from 'react';
import AuthContext from '../../store/auth-context';

const LoginPage = () => {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const ctx = useContext(AuthContext);

	const loginUser = (e) => {
		e.preventDefault();
		ctx.loginHandler(usernameRef.current.value, passwordRef.current.value);
	};

	return (
		<div className={styles['login-page__container']}>
			<div className={styles['login-page__content']}>
				<h1>LOGIN</h1>
				<form onSubmit={loginUser}>
					<input
						ref={usernameRef}
						type='text'
						required
						placeholder='Username..'
					/>
					<input
						ref={passwordRef}
						type='password'
						required
						placeholder='Password..'
					/>
					<button type='submit'>CONTINUE</button>
				</form>
				<button>SIGN UP</button>
			</div>
			<div className={styles['login-page__oauth']}>
				<h2>Or login with</h2>
				<ul className={styles['oauth__container']}>
					<li>
						<img src={facebookLogo} />
					</li>
					<li>
						<img src={twitterLogo} />
					</li>
					<li>
						<img src={googleLogo} />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default LoginPage;
