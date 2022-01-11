import React, { useState } from 'react'

export const PlayerContext = React.createContext({
  player: false,
  song: {},
  album: [],
  playlist: {},
  playlistPage: [],
  overlay: false,
  setSong: (song) => {},
  startPlaying: () => {},
  stopPlaying: () => {},
  setPlaylist: () => {},
  setPlaylistPage: () => {},
  setOverlay: () => {},
})

const PlayerCtx = (props) => {
  const [playing, setplaying] = useState(false)
  const [song, setsong] = useState({})
  const [playlist, setplaylist] = useState({})
  const [playlistPage, setplaylistPage] = useState([])
  const [overlay, setoverlay] = useState(false)

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

  const setOverlay = (data) => {
    setoverlay(data)
  }

  return (
    <PlayerContext.Provider
      value={{
        player: playing,
        song: song,
        playlist: playlist,
        playlistPage: playlistPage,
        overlay: overlay,
        setSong: setSongHandler,
        startPlaying: startPlayingHandler,
        stopPlaying: stopPlayingHandler,
        setPlaylist: setPlaylistHandler,
        setPlaylistPage: setPlaylistPageHandler,
        setOverlay: setOverlay,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  )
}

export default PlayerCtx
