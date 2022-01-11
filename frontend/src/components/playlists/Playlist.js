import styles from './Playlist.module.css'
import React, { useEffect, useState, useContext } from 'react'
import PlaylistItem from './PlaylistItem'
import AuthContext from '../../store/auth-context'
import PlaylistModal from './PlaylistModal'

const Playlists = () => {
  const auth = useContext(AuthContext)

  const [showModal, setshowModal] = useState(false)
  const [playlists, setplaylists] = useState([])

  useEffect(() => {
    if (!auth.user) return
    setplaylists(auth.user.playlists)
  }, [auth.user])

  const setModalHandler = () => {
    setshowModal((prevModal) => setshowModal(!prevModal))
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>My Playlists</h1>
      {playlists.map((playlist, index) => {
        return <PlaylistItem key={index} playlist={playlist} create={false} />
      })}
      <PlaylistItem create={true} setModalHandler={setModalHandler} />
      {showModal && <PlaylistModal setModalHandler={setModalHandler} />}
    </div>
  )
}

export default Playlists
