import React, { useContext } from 'react'
import styles from './SongListItem.module.css'
import { PlayerContext } from '../../store/playerContext'

const SongListItem = ({ index, song, setPlaylist, artist }) => {
  const addSongPlaylist = () => {
    //const {}
    console.log('add song', song)
    /*
  name: string
  artist: Artist[]
  lenght: number
  thumbnail: string
  videoId: string        
 */
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
            <h4>
              {artist
                ? artist
                : song.artist.name
                ? song.artist.name
                : song.artist}
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
          <div className={styles.options} onClick={addSongPlaylist}>
            <i className='fas fa-ellipsis-v'></i>
          </div>
        </>
      )}
    </div>
  )
}

export default SongListItem
