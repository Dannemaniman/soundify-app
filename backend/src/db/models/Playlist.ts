import { Schema } from 'mongoose';

// Document interface
interface Playlist {
  created_at: Date;
  modified_at: Date;
}


export = Playlist