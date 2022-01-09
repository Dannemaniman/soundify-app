import { Song } from './Song'

// Document interface
export interface PlaylistInterface {
  playlist_name: string
  songs: Song[]
  created_at: Date
  modified_at: Date
}
