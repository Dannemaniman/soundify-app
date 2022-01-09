import React, { useContext } from 'react'
import styles from './SongListItem.module.css'
import { PlayerContext } from '../../store/playerContext'

const SongListItem = ({ index, song, setPlaylist }) => {
  return (
    <div className={styles.item}>
      <section>
        <h2>
          {song.name.substring(0, 20)}
          {song.name.length >= 30 ? ' ...' : ''}
        </h2>
        <h4>{song.artist.name ? song.artist.name : song.artist}</h4>
      </section>

      <figure
        className={styles.figure}
        onClick={() => setPlaylist({ index: index, img: song.thumbnails })}
      >
        <div className={styles.play}>
          <i className='fas fa-play'></i>
        </div>
      </figure>
    </div>
  )
}

export default SongListItem
