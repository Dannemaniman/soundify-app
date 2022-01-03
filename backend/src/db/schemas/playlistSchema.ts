import mongoose, { Schema, model } from 'mongoose';
import { PlaylistInterface, PlaylistModel } from '../models/Playlist';

const playlistSchema = new Schema<PlaylistInterface, PlaylistModel>({});
