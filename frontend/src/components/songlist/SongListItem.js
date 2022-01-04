import React, { useContext } from 'react'
import styles from './SongListItem.module.css'
import { PlayerContext } from '../../store/playerContext'

const SongListItem = ({ song, thumbnails }) => {
  const player = useContext(PlayerContext)

  const setSongHandler = () => {
    player.setSong(song, thumbnails[0])
  }
  return (
    <div className={styles.item}>
      <section>
        <h2>{song.name}</h2>
        <h4>{song.artist.name}</h4>
      </section>

      <figure className={styles.figure} onClick={setSongHandler}>
        <div className={styles.play}>
          <i className='fas fa-play'></i>
        </div>
      </figure>
    </div>
  )
}

export default SongListItem
