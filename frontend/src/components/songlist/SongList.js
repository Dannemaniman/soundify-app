import React from 'react'
import SongListItem from './SongListItem'
import styles from './SongList.module.css'

const SongList = ({ songs, header, thumbnails }) => {
  return (
    <div className={styles.list}>
      <h1 className={styles.header}>{header}</h1>
      {songs.map((song, index) => (
        <SongListItem key={index} song={song} thumbnails={thumbnails} />
      ))}
    </div>
  )
}

export default SongList
