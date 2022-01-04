import { NextFunction, Request, Response, Router } from 'express';
import { PlaylistInterface } from '../db/models/Playlist';
import playlistService from '../services/playlistService';

import Playlist from '../db/schemas/playlistScema';

const router: Router = Router();

export = router;
