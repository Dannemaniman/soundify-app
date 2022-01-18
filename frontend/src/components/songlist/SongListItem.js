import React from 'react'
import { millisToMinutesAndSeconds } from '../utils/utils'
import styles from './SongListItem.module.css'
import SongListOption from './SongListOptions'

const SongListItem = ({ index, song, setPlaylist, artist, playlist }) => {
  const addSongPlaylist = async () => {
    let res = await fetch(`/api/playlist/update/${'Rock'}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(song),
    })
    let playlist = await res.json()
  }

  function getArtistName() {
    let name = song.artist?.name ? song.artist.name : song.author
    if (!name) name = artist
    return name
  }

  return (
    <div className={styles.item}>
      {song && (
        <>
          <section>
            <h2>
              {song.name?.substring(0, 20).replace('Video', '')}
              {song.name?.length >= 21 ? ' ...' : ''}
            </h2>
            <h4>
              {getArtistName()} - {millisToMinutesAndSeconds(song.duration)}
            </h4>
          </section>

          <figure
            className={styles.figure}
            onClick={() => setPlaylist({ index: index, img: song.thumbnails })}
          >
            <div className={styles.play}>
              <i className='fas fa-play'></i>
            </div>
          </figure>
          <SongListOption
            addSongPlaylist={addSongPlaylist}
            song={song}
            playlist={playlist}
            index={index}
          />
        </>
      )}
    </div>
  )
}

export default SongListItem
