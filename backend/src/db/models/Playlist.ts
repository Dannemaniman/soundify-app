import { Song } from './Song';

// Document interface
export interface PlaylistInterface {
	songs: Song[];
	created_at: Date;
	modified_at: Date;
}
