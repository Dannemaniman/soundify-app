import { Artist } from './Artist'

// Document interface
export default interface Song {
  name: string
  artist: Artist[]
  lenght: number
  thumbnail: string
}
