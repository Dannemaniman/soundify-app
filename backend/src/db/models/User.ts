import { Schema, model } from 'mongoose'
import Playlist from './Playlist'


// Document interface
export interface UserInterface {
  user_name: string
  password: string
  token: string
  playlists: Array<Playlist>
  email: string
}


