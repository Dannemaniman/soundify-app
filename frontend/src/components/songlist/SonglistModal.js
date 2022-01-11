import React, { useEffect, useContext, useState } from 'react'
import styles from './SonglistModal.module.css'
import AuthContext from '../../store/auth-context'

const SongListModal = (props) => {
  const auth = useContext(AuthContext)
  const [list, setlist] = useState([])

  useEffect(() => {
    console.log(auth.user.playlists)
    setlist(auth.user.playlists)
  }, [auth.user])

  const playlistHandler = async (name) => {
    console.log('playlist', name)
    console.log('song', props.song)
    let res = await fetch(`/api/playlist/update/${name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(props.song),
    })
    let playlist = await res.json()
    console.log(playlist)
  }

  return (
    <div className={styles.modal}>
      <h2 className={styles.header}>Add to playlist</h2>
      {list.map((playlist, index) => {
        return (
          <button
            key={index}
            onClick={() => playlistHandler(playlist.playlist_name)}
          >
            {playlist.playlist_name}
          </button>
        )
      })}
    </div>
  )
}

export default SongListModal
