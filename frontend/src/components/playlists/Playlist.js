import styles from './Playlist.module.css'
import React, { useEffect } from 'react'
//Först måste vi hämta den aktiva användaren
//const activeUser = await fetch('/');

//sen måste vi välja arrayen med spellistor från den specifika användaren
//const allPlaylists = activeUser.playlists;

//Rendera sedan ut alla spellistorna som finns innuti arrayen
const Playlists = (playlists) => {
  //TEMP SKIT
  useEffect(() => {
    async function fetcch() {
      const playlist = await fetch('/api/playlist/getallplaylists')
      let test = await playlist.json()
      console.log(test)
    }
    fetcch()
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>My Playlists</h1>
    </div>
  )
}

export default Playlists
