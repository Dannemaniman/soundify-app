import styles from './LoginPage.module.scss';
import facebookLogo from '../../assets/icons/facebook.png';
import twitterLogo from '../../assets/icons/twitter.png';
import googleLogo from '../../assets/icons/google.png';
import { useContext, useRef } from 'react';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router';

const LoginPage = () => {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const ctx = useContext(AuthContext);
	const navigate = useNavigate();

	const loginUser = async (e) => {
		e.preventDefault();
		if (
			await ctx.loginHandler(
				usernameRef.current.value,
				passwordRef.current.value
			)
		) {
			navigate('/', { replace: true });
		}
	};

	const onNavigateRegisterPage = () => {
		navigate('/signup', { replace: true });
	};

	return (
		<div className={styles['login-page__container']}>
			<div className={styles['login-page__content']}>
				<h1>LOGIN</h1>
				<form onSubmit={loginUser}>
					<input
						ref={usernameRef}
						type='email'
						required
						placeholder='Email..'
					/>
					<input
						ref={passwordRef}
						type='password'
						required
						placeholder='Password..'
					/>
					<button type='submit'>CONTINUE</button>
				</form>
				<button onClick={onNavigateRegisterPage}>SIGN UP</button>
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
