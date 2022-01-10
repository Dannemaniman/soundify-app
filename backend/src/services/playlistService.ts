import router from '../controllers/playlistController'
import { PlaylistInterface } from '../db/models/Playlist'
import Playlist from '../db/schemas/playlistSchema'
import User from '../db/schemas/userSchema'

const createNewPlaylist = async (playlist: PlaylistInterface, user: any) => {
  try {
    const doc = new Playlist(playlist)
    doc.user = user
    await doc.save()
    return doc
  } catch (error) {
    console.log(error)
  }
}
const getAllPlaylists = async () => {}

const getPlaylistById = async () => {}

const deletePlaylist = async () => {}

const updatePlaylist = async () => {}

const playlistService = {
  createNewPlaylist,
  getAllPlaylists,
}

export default playlistService
