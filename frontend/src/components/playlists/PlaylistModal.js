import React, { useState, useContext } from 'react'
import styles from './PlaylistModal.module.css'
import AuthContext from '../../store/auth-context'

const PlaylistModal = ({ setModalHandler, deleteList }) => {
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
  }
  const deletePlaylist = async () => {
    let res = await fetch(`/api/playlist/deleteplaylist/${deleteList.id}`, {
      method: 'DELETE',
    })
    let resp = await res.json()
    auth.updateUserPlaylist(resp.id)
    setModalHandler()
  }

  const DeleteList = () => {
    return (
      <div
        className={styles.form}
        style={{ height: '10rem', gridTemplateRows: 'auto' }}
      >
        <label className={styles.label}>Confirm delete</label>
        <div className={styles.btnContainer}>
          <button className={styles.delete} onClick={deletePlaylist}>
            Confirm
          </button>
          <button className={styles.cancel} onClick={() => setModalHandler()}>
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={styles.overlay} onClick={() => setModalHandler()}></div>
      {!deleteList.delete && (
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
      )}
      {deleteList.delete && <DeleteList />}
    </>
  )
}

export default PlaylistModal
