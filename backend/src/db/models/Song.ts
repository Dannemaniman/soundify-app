import Artist from './Artist';

// Document interface
interface Song {
	name: string;
	artist: Artist[];
	lenght: number;
}

export = Song;
