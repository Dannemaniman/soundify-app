import React, { useContext } from 'react'
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

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000)
    var seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
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
              {song.artist?.name ? song.artist.name : song.author} -{' '}
              {millisToMinutesAndSeconds(song.duration)}
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
          />
        </>
      )}
    </div>
  )
}

export default SongListItem
