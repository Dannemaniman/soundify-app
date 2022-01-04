import mongoose, { Schema, model } from 'mongoose';
import { PlaylistInterface } from '../models/Playlist';

const playlistSchema = new Schema<PlaylistInterface>({
	songs: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: false },
	],
	created_at: { type: Date },
	modified_at: { type: Date },
});

const Playlist = model<PlaylistInterface>('Playlist', playlistSchema);
export default Playlist;
