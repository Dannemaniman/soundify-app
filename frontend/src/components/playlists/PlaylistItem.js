import React, { useContext } from 'react'
import { PlayerContext } from '../../store/playerContext'
import { useNavigate } from 'react-router-dom'
import styles from './PlaylistItem.module.css'

const PlaylistItem = (props) => {
  const ctx = useContext(PlayerContext)
  let navigate = useNavigate()

  const createPlaylist = async () => {
    console.log('create')
    let response = await fetch('/api/playlist/createplaylist', {
      method: 'POST',
      data: JSON.stringify({ name: 'testing' }),
    })
    let test = response.json()
    console.log(test)
  }

  const playListHandler = () => {
    // ctx.setPlaylistPage(props.playlist)
    //  navigate(`/playlist`, { replace: true })
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
          <div className={styles.plus} onClick={createPlaylist}>
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
        <div className={styles.options}>
          <i className='fas fa-ellipsis-v'></i>
        </div>
      )}
    </div>
  )
}

export default PlaylistItem
