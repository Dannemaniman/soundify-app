import React, { useState } from 'react'

export const PlayerContext = React.createContext({
  player: false,
  song: {},
  album: [],
<<<<<<< HEAD
  playlist: [],
  setSong: (song) => {},
  startPlaying: () => {},
  stopPlaying: () => {},
=======
  playlist: {},
  setSong: (song) => {},
  startPlaying: () => {},
  stopPlaying: () => {},
  setPlaylist: () => {},
>>>>>>> 0daea0579d2636e098cfcf1e7c98b8d9d3c3100f
})

export default (props) => {
  const [playing, setplaying] = useState(false)
  const [song, setsong] = useState({})
<<<<<<< HEAD
=======
  const [playlist, setplaylist] = useState({})
>>>>>>> 0daea0579d2636e098cfcf1e7c98b8d9d3c3100f

  const setSongHandler = (track, img) => {
    setsong({ song: track, img: img })
    setplaying(true)
  }
  const startPlayingHandler = () => {
    setplaying(true)
  }
  const stopPlayingHandler = () => {
    setplaying(false)
  }
<<<<<<< HEAD
=======
  const setPlaylistHandler = (data) => {
    setplaylist(data)
  }
>>>>>>> 0daea0579d2636e098cfcf1e7c98b8d9d3c3100f

  return (
    <PlayerContext.Provider
      value={{
        player: playing,
<<<<<<< HEAD
        setSong: setSongHandler,
        song: song,
        startPlaying: startPlayingHandler,
        stopPlaying: stopPlayingHandler,
=======
        song: song,
        playlist: playlist,
        setSong: setSongHandler,
        startPlaying: startPlayingHandler,
        stopPlaying: stopPlayingHandler,
        setPlaylist: setPlaylistHandler,
>>>>>>> 0daea0579d2636e098cfcf1e7c98b8d9d3c3100f
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  )
}
