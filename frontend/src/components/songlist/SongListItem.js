import React, { useContext } from 'react'
import styles from './SongListItem.module.css'
import SongListOption from './SongListOptions'

const SongListItem = ({ index, song, setPlaylist, artist }) => {
  const addSongPlaylist = async () => {
    console.log('add song', song)
    let res = await fetch(`/api/playlist/update/${'Rock'}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(song),
    })
    let playlist = await res.json()
    console.log(playlist)
  }

  return (
    <div className={styles.item}>
      {song && (
        <>
          <section>
            <h2>
              {song.name.substring(0, 20)}
              {song.name.length >= 21 ? ' ...' : ''}
            </h2>
            <h4>{song.artist?.name ? song.artist.name : song.author}</h4>
          </section>

          <figure
            className={styles.figure}
            onClick={() => setPlaylist({ index: index, img: song.thumbnails })}
          >
            <div className={styles.play}>
              <i className='fas fa-play'></i>
            </div>
          </figure>
          <SongListOption addSongPlaylist={addSongPlaylist} song={song} />
        </>
      )}
    </div>
  )
}

export default SongListItem
