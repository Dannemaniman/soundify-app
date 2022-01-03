import { Model, Schema, model } from 'mongoose'
import Playlist from './Playlist'


export interface UserModel extends Model<UserInterface> {
  findByCredentials: (email: string, password: string) => Promise<UserInterface>
}

// Document interface
export interface UserInterface {
  user_name: string
  password: string
  tokens: string[]
  playlists: Array<Playlist>
  email: string
  generateAuthToken: () => Promise<void>
  getPublicProfile: () => Promise<void>
}


