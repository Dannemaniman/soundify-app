import { PlaylistInterface } from '../db/models/Playlist';
import Playlist from '../db/schemas/playlistSchema';

const createNewPlaylist = async (playlist: PlaylistInterface) => {
	try {
		const doc = new Playlist(playlist);
		await doc.save();
		return doc;
	} catch (error) {
		console.log(error);
	}
};

const getPlaylistById = async () => {};

const deletePlaylist = async () => {};

const updatePlaylist = async () => {};

const playlistService = {
	createNewPlaylist,
};

export default playlistService;
