import mongoose, { Schema, model } from 'mongoose'
import { PlaylistInterface } from '../models/Playlist'

const playlistSchema = new Schema<PlaylistInterface>(
  {
    playlist_name: { type: String, required: true, unique: true },
    songs: [],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
)

const Playlist = model<PlaylistInterface>('Playlist', playlistSchema)
export default Playlist
