import { Artist } from './Artist'

// Document interface
export interface Song {
  name: string
  artist: Artist[]
  lenght: number
  thumbnail: string
  videoId: string
}
