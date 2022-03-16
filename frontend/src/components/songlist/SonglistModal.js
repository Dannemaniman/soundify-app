import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styles from './SonglistModal.module.css'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SongListModal = (props) => {
  const auth = useAuth()
  let param = useParams()
  const [list, setlist] = useState([])

  useEffect(() => {
    if (!auth.user) return
    setlist(auth.user.playlists)
  }, [auth.user])

  const playlistHandler = async (_id) => {
    let newSong = {
      name: props.song.name,
      thumbnails: Array.isArray(props.song.thumbnails)
        ? props.song.thumbnails
        : [{ ...props.song.thumbnails }],
      duration: props.song.duration,
      videoId: props.song.videoId,
      artist: props.song.artist ? props.song.artist : props.song.author,
    }

    if (!props.song) return
    let response = await fetch(`/api/playlist/update/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSong),
    })

    let res = await response.json()
    auth.updatePlaylistSongs(res)
    toast.success('Song added to playlist', {
      autoClose: 2500,
      hideProgressBar: true,
    })
  }

  const deleteSongHandler = async () => {
    let response = await fetch(
      `/api/playlist/delete/${param.id}/${props.song.videoId}`,
      {
        method: 'DELETE',
      }
    )
    let res = await response.json()
    auth.updatePlaylistSongs(res)
    // player.setSongPlaylists()
  }

  let playlistOptions = (
    <button onClick={deleteSongHandler} className={styles.btn}>
      delete
    </button>
  )

  return (
    <div
      className={`${styles.modal} ${props.playlist ? styles.deleteModal : ''}`}
    >
      <h2 className={styles.header}>
        {' '}
        {props.playlist ? 'Remove song' : 'Add to playlist'}
      </h2>
      <div className={styles.modalList}>
        {props.playlist && playlistOptions}
        {!props.playlist &&
          list.map((playlist, index) => {
            return (
              <button
                key={index}
                onClick={() => playlistHandler(playlist._id)}
                className={styles.btn}
              >
                {playlist.playlist_name}
              </button>
            )
          })}
      </div>
    </div>
  )
}

export default SongListModal
