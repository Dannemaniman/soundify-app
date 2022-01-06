import styles from './Playlist.module.css'
import React, { useEffect, useState } from 'react'
import PlaylistItem from './PlaylistItem'
//Först måste vi hämta den aktiva användaren
//const activeUser = await fetch('/');

//sen måste vi välja arrayen med spellistor från den specifika användaren
//const allPlaylists = activeUser.playlists;

//Rendera sedan ut alla spellistorna som finns innuti arrayen
const Playlists = (lists) => {
  const [playlists, setplaylists] = useState([])
  //TEMP SKIT
  useEffect(() => {
    async function fetcch() {
      const playlistss = await fetch('/api/playlist/getallplaylists')
      setplaylists(await playlistss.json())
    }
    fetcch()
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>My Playlists</h1>
      {playlists.map((playlist, index) => {
        return <PlaylistItem key={index} playlist={playlist} create={false} />
      })}
      <PlaylistItem create={true} />
    </div>
  )
}

export default Playlists
