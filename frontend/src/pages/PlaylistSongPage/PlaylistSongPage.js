import React, { useContext, useEffect, useState } from 'react'
import { PlayerContext } from '../../store/playerContext'
import SongList from '../../components/songlist/SongList'
import styles from './PlaylistSongPage.module.css'

const PlaylistSongPage = () => {
  const [list, setlist] = useState([])
  const ctx = useContext(PlayerContext)

  useEffect(() => {
    setlist(ctx.playlistPage.songs)
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{ctx.playlistPage.playlist_name}</h1>
      {list ? <SongList songs={list} header={''} /> : ''}
    </div>
  )
}

export default PlaylistSongPage
