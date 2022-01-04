import { Model, Schema, model } from 'mongoose'
import Playlist from './Playlist'

// Document interface
export interface ReturnUserInterface {
  user_name: string
  playlists: Array<Playlist>
  email: string
}


