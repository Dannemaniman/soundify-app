import { Schema, model } from 'mongoose';
import Playlist from './Playlist';


// Document interface
export interface User {
  user_name: string;
  password: string;
  playlists: Array<Playlist>;
  email: string;
}

//Mongoose Schema
export const userSchema = new Schema<User>({
  user_name: { type: String, required: true },
  password: { type: String, required: true },
  playlists: { type: [String], required: false },
  email: { type: String, required: true }
})

export const UserModel = model<User>('User', userSchema);
