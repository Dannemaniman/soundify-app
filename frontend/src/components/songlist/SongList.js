import React, { useContext } from 'react'
import SongListItem from './SongListItem'
import styles from './SongList.module.css'
import { PlayerContext } from '../../store/playerContext'

const SongList = ({ songs, header, thumbnails }) => {
  const player = useContext(PlayerContext)

  const setPlaylistHandler = (data) => {
    //console.log(songs, data)
    player.setPlaylist({
      content: { songs: songs, thumbnails: thumbnails },
      index: data,
    })
  }

  return (
    <div className={styles.list}>
      <h1 className={styles.header}>{header}</h1>
      {songs.map((song, index) => (
        <SongListItem
          key={index}
          index={index}
          song={song}
          setPlaylist={setPlaylistHandler}
        />
      ))}
    </div>
  )
}

export default SongList
