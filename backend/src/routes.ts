import { Application } from 'express';
import user from './controllers/userController';
import playlist from './controllers/playlistController';

export = (app: Application): void => {
	// Routes
	app.use('/api/user', user);
	app.use('/api/playlist', playlist);
};
