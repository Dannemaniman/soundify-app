import React, { useState } from 'react'

export const PlayerContext = React.createContext({
  player: false,
  song: {},
  album: [],
  playlist: {},
  playlistPage: [],
  setSong: (song) => {},
  startPlaying: () => {},
  stopPlaying: () => {},
  setPlaylist: () => {},
  setPlaylistPage: () => {},
})

export default (props) => {
  const [playing, setplaying] = useState(false)
  const [song, setsong] = useState({})
  const [playlist, setplaylist] = useState({})
  const [playlistPage, setplaylistPage] = useState([])

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
  const setPlaylistHandler = (data) => {
    setplaylist(data)
  }

  const setPlaylistPageHandler = (data) => {
    setplaylistPage(data)
  }

  return (
    <PlayerContext.Provider
      value={{
        player: playing,
        song: song,
        playlist: playlist,
        playlistPage: playlistPage,
        setSong: setSongHandler,
        startPlaying: startPlayingHandler,
        stopPlaying: stopPlayingHandler,
        setPlaylist: setPlaylistHandler,
        setPlaylistPage: setPlaylistPageHandler,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  )
}
