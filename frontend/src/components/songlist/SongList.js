import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"

import { PlayerContext } from '../../store/playerContext'
import SongListItem from './SongListItem'
import styles from './SongList.module.css'

const SongList = ({ songs, header, thumbnails, artist }) => {
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
    console.log("Yo")
    navigate(`/search/show-more?query=songs&name=${query}`)
  }

  return (
    <div className={styles.list}>
      <h1 className={styles.header}>{header}</h1>
      {console.log(artist)}
      {songs.map((song, index) => (
        <SongListItem
          key={index}
          index={index}
          song={song}
          artist={artist}
          setPlaylist={setPlaylistHandler}
        />
      ))}
      <p style={{ textDecoration: "underline" }} onClick={() => { handleClickToViewMore(artist) }}>View more</p>
    </div>
  )
}

export default SongList
