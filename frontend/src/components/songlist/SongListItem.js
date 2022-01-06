import React from 'react'
import styles from './SongListItem.module.css'

const SongListItem = ({ song }) => {



  return (
    <div className={styles.item}>
      {console.log(song)}
      <section>
        {/* <h2>{ song.name.substring(0, 20)}{song.name.length >= 20 ? " ..." : ""}</h2> */}
        {song.artist.name && <h4>{song.artist.name}</h4>}
        {song.author && <h4>{song.author}</h4>}
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
