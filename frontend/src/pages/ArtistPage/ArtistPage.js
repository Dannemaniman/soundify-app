import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import HeroImg from '../../components/heroImg/HeroImg';
import SongList from '../../components/songlist/SongList';
import Carousel from '../../components/carousel/Carousel';
import styles from './ArtistPage.module.css';

const ArtistPage = () => {
	const param = useParams();
	const navigate = useNavigate();

	const [artist, setArtist] = useState('');
	const [viewMore, setViewMore] = useState(false);
	const [albums, setAlbums] = useState([]);
	const [songs, setSongs] = useState([]);
	const [singles, setSingles] = useState('');

	useEffect(() => {
		const fetchArtist = async () => {
			const response = await fetch(
				`https://yt-music-api.herokuapp.com/api/yt/artist/${param.id}`
			);
			const artists = await response.json();
			if (artists.error) {
				navigate(-1);
			}

			const songArray = artists.products['songs']?.content;

			setArtist(artists);
			setAlbums(artists.products['albums']?.content);
			setSingles(artists.products['singles']?.content);
			setSongs(await fetchMoreDetaliedSongs(songArray));

			//If artist does not have any songs
			if (songArray?.length <= 0) {
				setSongs(await fetchMoreSongs(artists.name));
			}
		};

		const fetchMoreSongs = async (name) => {
			let response = await fetch(
				`https://yt-music-api.herokuapp.com/api/yt/videos/${name.toLowerCase()}`
			);
			const res = await response.json();
			const moreSongs = res.content;

			//Returns array with songs
			return moreSongs;
		};

		fetchArtist();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [param.id]);

	async function fetchMoreDetaliedSongs(songArray) {
		let newSongArr = await Promise.all(
			songArray.map(async (song) => {
				let url =
					'https://yt-music-api.herokuapp.com/api/yt/song/' + song.videoId;
				let result = await fetch(url);
				return result.json();
			})
		);
		return removeNullFromArray(newSongArr);
	}

	function removeNullFromArray(arr) {
		return arr.filter((ele) => {
			return ele !== null;
		});
	}

	return (
		<>
			{artist && (
				<div className={styles.artistpage}>
					<HeroImg
						imgUrl={artist.thumbnails[0].url}
						caption={artist.name}
						url={window.location.href}
					/>

					<section className={styles.description}>
						<h1 style={{ paddingBottom: '1rem' }}>About {artist.name}</h1>
						<p
							className={styles.text}
							style={{ height: viewMore ? 'auto' : null }}>
							{artist.description ? artist.description : 'No available info'}
						</p>
						<button
							className={styles.button}
							onClick={() => setViewMore(!viewMore)}>
							{viewMore ? 'View less' : 'View more'}
						</button>
					</section>

					{songs.length > 0 && (
						<section className={styles.songs}>
							<SongList
								songs={songs.slice(0, 5)}
								header={`Songs by  ${artist.name}`}
							/>
						</section>
					)}

					{albums && <Carousel title={'albums'} list={albums} />}
				</div>
			)}
		</>
	);
};

export default ArtistPage;
