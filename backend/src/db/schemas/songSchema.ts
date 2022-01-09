import mongoose, { Schema, model } from 'mongoose'
import { Song } from '../models/Song'

const songSchema = new Schema<Song>({
  name: { type: String, required: true, trim: true, unique: true },
  artist: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Artist' }],
  length: { type: Number, required: true, trim: true },
}, {
  timestamps: true
})

const Song = model<Song>('Song', songSchema)

export default Song