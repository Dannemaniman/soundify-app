import { NextFunction, Request, Response, Router } from 'express';
import { PlaylistInterface } from '../db/models/Playlist';
import playlistService from '../services/playlistService';

const router: Router = Router();

router.post('/createplaylist', async (req: Request, res: Response) => {
	try {
		const newPlaylist = await playlistService.createNewPlaylist(
			req.body as PlaylistInterface
		);
		res.send(200);
	} catch (error: any) {
		res.sendStatus(500).json(error.message);
	}
});

router.get('/getplaylist/:id', (req: Request, res: Response) => {
	res.send(req.body);
});

router.delete('/deleteplaylist/:id', async (req: Request, res: Response) => {
	res.send(req.params);
});

router.put('/updateplaylist/:id', async (req: Request, res: Response) => {
	//hämta listan med id
	res.json(req.body);
});

export = router;

//get, save, update, delete, create
