import React, { useContext } from 'react'
import styles from './SongListItem.module.css'
import { PlayerContext } from '../../store/playerContext'

const SongListItem = ({ index, song, setPlaylist }) => {
  //const player = useContext(PlayerContext)

  return (
    <div className={styles.item}>
      <section>
        <h2>{song.name}</h2>
        <h4>{song.artist.name}</h4>
      </section>

      <figure className={styles.figure} onClick={() => setPlaylist(index)}>
        <div className={styles.play}>
          <i className='fas fa-play'></i>
        </div>
      </figure>
    </div>
  )
}

export default SongListItem
