import { Schema, model } from 'mongoose'
import Playlist from './Playlist'


// Document interface
export interface User {
  user_name: string
  password: string
  playlists: Array<Playlist>
  email: string
}


