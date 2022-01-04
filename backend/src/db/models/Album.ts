import Artist from './Artist';
import Song from './Song';

interface Album {
	artist: Artist;
	songs: Song[];
}

export = Album;
