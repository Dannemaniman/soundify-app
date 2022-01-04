import { NextFunction, Request, Response, Router } from 'express';
import { PlaylistInterface } from '../db/models/Playlist';
import playlistService from '../services/playlistService';

const router: Router = Router();

router.post('/createplaylist', async (req: Request, res: Response) => {
	try {
		const newPlaylist = await playlistService.createNewPlaylist(
			req.body as PlaylistInterface
		);
		console.log(req.body);
		res.send(200);
		console.log('Success??');
	} catch (error: any) {
		res.sendStatus(500).json(error.message);
	}
});

router.get('/created', (req: Request, res: Response) => {
	res.send('HEYO från GET i Created PLaylistuuu');
});

export = router;
