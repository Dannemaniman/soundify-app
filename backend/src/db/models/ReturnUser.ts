import { Model, Schema, model } from 'mongoose'
import Playlist from './Playlist'

// Document interface
export interface ReturnUser {
  user_name: string
  playlists: Array<Playlist>
  email: string
}


