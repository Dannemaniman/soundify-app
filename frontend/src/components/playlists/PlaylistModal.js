import React, { useState, useContext } from 'react'
import styles from './PlaylistModal.module.css'
import AuthContext from '../../store/auth-context'

const PlaylistModal = ({ setModalHandler }) => {
  const [name, setname] = useState('')
  const auth = useContext(AuthContext)

  const addPlaylist = async () => {
    fetch('/api/playlist/createplaylist', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ playlist_name: name }),
    })
      .then((data) => data.json())
      .then((data) => {
        auth.setUserHandler(data)
      })

    setModalHandler()
    //console.log(await response.json())
  }

  return (
    <>
      <div className={styles.overlay} onClick={() => setModalHandler()}></div>
      <div className={styles.form}>
        <label className={styles.label}>New playlist</label>
        <input
          className={`${styles.input} ${styles.inputFocus}`}
          type='text'
          placeholder='enter name'
          value={name}
          onChange={(event) => setname(event.target.value)}
        />
        <button className={styles.button} onClick={addPlaylist}>
          Confirm
        </button>
      </div>
    </>
  )
}

export default PlaylistModal
