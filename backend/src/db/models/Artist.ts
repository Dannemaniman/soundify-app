import Album from './Album';
import Song from './Song';

interface Artist {
	artist_name: string;
	albums: Album[];
	songs: Song[];
}

export = Artist;
