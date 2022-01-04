import Artist from './Artist'

// Document interface
interface Song {
	name: string
	artist: Artist[]
	length: number
}

export = Song
