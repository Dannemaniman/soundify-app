import styles from './Playlist.module.css'
import React, { useEffect, useState, useContext } from 'react'
import PlaylistItem from './PlaylistItem'
import AuthContext from '../../store/auth-context'
//Först måste vi hämta den aktiva användaren
//const activeUser = await fetch('/');

//sen måste vi välja arrayen med spellistor från den specifika användaren
//const allPlaylists = activeUser.playlists;

//Rendera sedan ut alla spellistorna som finns innuti arrayen
const Playlists = (lists) => {
  const auth = useContext(AuthContext)

  const [playlists, setplaylists] = useState([])
  //TEMP SKIT
  useEffect(() => {
    async function fetcch() {
      const playlistss = await fetch(`/api/playlist/getallplaylists`)
      let test = await playlistss.json()
      setplaylists(test)
      console.log(test)
    }
    fetcch()

    //setplaylists(auth.user.playlists)
    //console.log(auth.user.playlists)
  }, [auth.user])

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
