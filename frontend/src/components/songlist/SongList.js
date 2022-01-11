import React, { useContext } from 'react'
import SongListItem from './SongListItem'
import styles from './SongList.module.css'
import { PlayerContext } from '../../store/playerContext'


const SongList = ({ songs, header, thumbnails }) => {
  const player = useContext(PlayerContext)

  const setPlaylistHandler = (data) => {
    player.setPlaylist({
      content: { songs: songs, thumbnails: data.img ? data.img : thumbnails },
      index: data.index,
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
      <p style={{ textDecoration: "underline" }} >View more songs</p>
    </div>
  )
}

export default SongList
