import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { PlayerContext } from '../../store/playerContext'
import SongListItem from './SongListItem'
import styles from './SongList.module.css'

const SongList = ({ songs, header, thumbnails, artist, playlist }) => {
  const player = useContext(PlayerContext)
  let navigate = useNavigate()

  const setPlaylistHandler = (data) => {
    player.setPlaylist({
      content: { songs: songs, thumbnails: data.img ? data.img : thumbnails },
      index: data.index,
      artistImg: artist,
    })
  }

  const handleClickToViewMore = (query) => {
    navigate(`/search/show-more?query=songs&name=${query}`)
  }

  return (
    <div className={styles.list}>
      {header && <h1 className={styles.header}>{header}</h1>}
      {songs.map((song, index) => (
        <SongListItem
          key={index}
          index={index}
          song={song}
          artist={artist}
          setPlaylist={setPlaylistHandler}
          playlist={playlist}
        />
      ))}
      {artist && (
        <p
          style={{ textDecoration: 'underline', color: 'black' }}
          onClick={() => {
            handleClickToViewMore(artist)
          }}
        >
          View more
        </p>
      )}
    </div>
  )
}

export default SongList
