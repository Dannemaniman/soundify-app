import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import SoundifyContextProvider from './store/soundify-context';
import { AuthContextProvider } from './store/auth-context';
import PlayerProvider from './store/playerContext';

ReactDOM.render(
	<PlayerProvider>
		<AuthContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthContextProvider>
	</PlayerProvider>,
	document.getElementById('root')
);
