import React, { useState } from 'react'

export const PlayerContext = React.createContext({
  player: false,
  song: {},
  album: [],
  playlist: {},
  setSong: (song) => { },
  startPlaying: () => { },
  stopPlaying: () => { },
  setPlaylist: () => { },
})

const PlayerCtx = (props) => {
  const [playing, setplaying] = useState(false)
  const [song, setsong] = useState({})
  const [playlist, setplaylist] = useState({})

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

  return (
    <PlayerContext.Provider
      value={{
        player: playing,
        song: song,
        playlist: playlist,
        setSong: setSongHandler,
        startPlaying: startPlayingHandler,
        stopPlaying: stopPlayingHandler,
        setPlaylist: setPlaylistHandler,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  )
}

export default PlayerCtx
