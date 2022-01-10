import React, { useContext, useState } from 'react'
import { PlayerContext } from '../../store/playerContext'
import { useNavigate } from 'react-router-dom'
import styles from './PlaylistItem.module.css'

const PlaylistItem = (props) => {
  const ctx = useContext(PlayerContext)
  let navigate = useNavigate()

  const playListHandler = () => {
    if (props.create) {
      console.log('modal')
      props.setModalHandler(true)
    }
    // ctx.setPlaylistPage(props.playlist)
    //  navigate(`/playlist`, { replace: true })
  }

  const deletePlaylist = async () => {
    let res = await fetch(
      `/api/playlist//deleteplaylist/${props.playlist._id}`,
      {
        method: 'DELETE',
      }
    )
    let resp = await res.json()
    console.log(resp)
  }

  return (
    <div className={styles.container} onClick={playListHandler}>
      <figure className={styles.figure}>
        {!props.create ? (
          <img
            className={styles.img}
            src={
              props.playlist.songs.length < 1
                ? ''
                : props.playlist.songs[0].thumbnail
            }
            alt='photo'
          />
        ) : (
          <div className={styles.plus}>
            <i className='far fa-plus'></i>
          </div>
        )}
      </figure>
      <div className={styles.name}>
        <p>
          {!props.create ? props.playlist.playlist_name : 'Create new playlist'}
        </p>
      </div>
      {!props.create && (
        <div className={styles.options} onClick={deletePlaylist}>
          <i className='fas fa-trash-alt'></i>
        </div>
      )}
    </div>
  )
}

export default PlaylistItem
