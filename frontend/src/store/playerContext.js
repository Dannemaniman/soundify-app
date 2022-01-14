import React, { useState } from 'react'

export const PlayerContext = React.createContext({
  player: false,
  song: {},
  album: [],
  playlist: {},
  overlay: false,
  songPlaylist: false,
  setSong: (song) => {},
  startPlaying: () => {},
  stopPlaying: () => {},
  setPlaylist: () => {},
  setOverlay: () => {},
  setSongPlaylists: () => {},
})

const PlayerCtx = (props) => {
  const [playing, setplaying] = useState(false)
  const [song, setsong] = useState({})
  const [playlist, setplaylist] = useState({})
  const [overlay, setoverlay] = useState(false)
  const [songPlaylist, setsongPlaylist] = useState(false)

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

  const setOverlay = (data) => {
    setoverlay(data)
  }

  const setSongPlaylistHandler = () => {
    setsongPlaylist(!songPlaylist)
  }

  return (
    <PlayerContext.Provider
      value={{
        player: playing,
        song: song,
        playlist: playlist,
        overlay: overlay,
        songPlaylist: songPlaylist,
        setSong: setSongHandler,
        startPlaying: startPlayingHandler,
        stopPlaying: stopPlayingHandler,
        setPlaylist: setPlaylistHandler,
        setOverlay: setOverlay,
        setSongPlaylists: setSongPlaylistHandler,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  )
}

export default PlayerCtx
