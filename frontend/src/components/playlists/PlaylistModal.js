import React, { useState } from 'react'
import styles from './PlaylistModal.module.css'

const PlaylistModal = ({ setModalHandler }) => {
  const [name, setname] = useState('')

  const addPlaylist = async () => {
    console.log('click', name)

    fetch('/api/playlist/createplaylist', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ playlist_name: name }),
    })
      .then((data) => data.json())
      .then((data) => console.log(data))

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
