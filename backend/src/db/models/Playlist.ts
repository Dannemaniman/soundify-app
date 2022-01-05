import { Schema } from 'mongoose';
import Song from './Song';

// Document interface
interface Playlist {
	songs: Song[];
	created_at: Date;
	modified_at: Date;
}

export = Playlist;
