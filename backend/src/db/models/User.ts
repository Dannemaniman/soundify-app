import { Model, Schema, model } from 'mongoose';
import { PlaylistInterface } from './Playlist';

export interface UserModel extends Model<UserInterface> {
	findByCredentials: (
		email: string,
		password: string
	) => Promise<UserInterface>;
}

// Document interface
export interface UserInterface {
	user_name: string;
	password: string;
	tokens: string[];
	playlists: Array<PlaylistInterface>;
	email: string;
	generateAuthToken: () => Promise<void>;
	getPublicProfile: () => Promise<void>;
}
