import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import SongList from '../../components/songlist/SongList'
import styles from './PlaylistSongPage.module.css'
import { PlayerContext } from '../../store/playerContext'

const PlaylistSongPage = () => {
  const [playlist, setPlaylist] = useState([])
  const [loading, setloading] = useState(true)

  const player = useContext(PlayerContext)
  let param = useParams()

  useEffect(() => {
    setloading(true)
    const fetchList = async () => {
      let response = await fetch(`/api/playlist/getplaylist/${param.id}`)
      let res = await response.json()

      setPlaylist(res)
      setloading(false)
    }
    fetchList()
  }, [player.songPlaylist])

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{playlist.playlist_name}</h1>
      {loading ? (
        ''
      ) : playlist.songs?.length ? (
        <SongList songs={playlist.songs} header={''} playlist={true} />
      ) : (
        <h1 className={styles.noSongs}>No songs here!</h1>
      )}
    </div>
  )
}

export default PlaylistSongPage
