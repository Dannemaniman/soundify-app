import mongoose, { Schema, model } from 'mongoose'
import { UserInterface } from '../models/User'

const userSchema = new Schema<UserInterface>({
  user_name: { type: String, required: true },
  password: { type: String },
  token: { type: String },
  playlists: { type: [String], required: false },
  email: { type: String, unique: true }
})

export default mongoose.model('user', userSchema)
