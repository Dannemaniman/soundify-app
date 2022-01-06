import React from 'react'
import styles from './PlaylistItem.module.css'

const PlaylistItem = (props) => {
  const createPlaylist = () => {
    console.log('create')
  }

  return (
    <div className={styles.container}>
      <figure className={styles.figure}>
        {!props.create ? (
          <img className={styles.img} src={props.playlist?.img} alt='photo' />
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
