import React from 'react'
import SongListItem from './SongListItem'
import styles from './SongList.module.css'

const SongList = ({ songs, header }) => {
  return (
    <div className={styles.list}>
      <h1 className={styles.header}>{header}</h1>
      {songs.map((song, index) => (
        <SongListItem key={index} song={song} />
      ))}
    </div>
  )
}

export default SongList
