import React, { useContext } from 'react'
import styles from './SongListItem.module.css'
import { PlayerContext } from '../../store/playerContext'

const PlayBtn = ({ songs, index, song, thumbnails }) => {

  const player = useContext(PlayerContext)

  const setPlaylistHandler = (data) => {
    player.setPlaylist({
      content: { songs: songs, thumbnails: data.img ? data.img : thumbnails },
      index: data.index,
    })
  }

  return (
    <figure
      className={styles.figure}
      onClick={() => setPlaylistHandler({ index: index, img: song.thumbnails })}
    >
      <div className={styles.play}>
        <i className='fas fa-play'></i>
      </div>
    </figure>
  )
}

export default PlayBtn