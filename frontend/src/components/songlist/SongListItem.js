import React from 'react'
import styles from './SongListItem.module.css'

const SongListItem = ({ song }) => {
  return (
    <div className={styles.item}>
      <section>
        <h2>{song.name}</h2>
        <h4>{song.artist.name}</h4>
      </section>

      <figure className={styles.figure}>
        <div className={styles.play}>
          <i className='fas fa-play'></i>
        </div>
      </figure>
    </div>
  )
}

export default SongListItem
