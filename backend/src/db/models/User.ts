import { Model, Schema, model } from 'mongoose'
import Playlist from './Playlist'


export interface UserModel extends Model<User> {
  findByCredentials: (email: string, password: string) => Promise<User>
}

// Document interface
export interface User {
  user_name: string
  password: string
  tokens: string[]
  playlists: Array<Playlist>
  email: string
  generateAuthToken: () => Promise<void>
  getPublicProfile: () => Promise<void>
}


