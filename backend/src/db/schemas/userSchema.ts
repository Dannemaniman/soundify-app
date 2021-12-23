import mongoose, { Schema, model } from 'mongoose'
import { User } from '../models/User'

//Mongoose Schema
export const userSchema = new Schema<User>({
  user_name: { type: String, required: true },
  password: { type: String, required: true },
  playlists: { type: [String], required: false },
  email: { type: String, required: true }
})