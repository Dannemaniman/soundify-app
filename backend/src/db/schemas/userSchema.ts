import mongoose, { Schema, model } from 'mongoose'
import { UserInterface } from '../models/User'
import bcrypt from "bcrypt"


const userSchema = new Schema<UserInterface>({
  user_name: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  token: { type: String },
  playlists: { type: [String], required: false },
  email: { type: String, unique: true }
})

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

export default mongoose.model('user', userSchema)
