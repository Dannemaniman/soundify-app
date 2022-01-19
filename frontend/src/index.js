import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { ApiContextProvider} from './store/api-context';
import { AuthContextProvider } from './store/auth-context';
import PlayerProvider from './store/playerContext';

ReactDOM.render(
	<PlayerProvider>
		<AuthContextProvider>
			<ApiContextProvider>
				<BrowserRouter>
					<App />
					<ToastContainer theme='colored' position='bottom-center' />
				</BrowserRouter>
			</ApiContextProvider>
		</AuthContextProvider>
	</PlayerProvider>,
	document.getElementById('root')
);
