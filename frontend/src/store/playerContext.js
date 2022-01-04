import React, { useState } from 'react'

export const PlayerContext = React.createContext({
  player: false,
  song: {},
  album: [],
  playlist: [],
  setSong: (song) => {},
  startPlaying: () => {},
  stopPlaying: () => {},
})

export default (props) => {
  const [playing, setplaying] = useState(false)
  const [song, setsong] = useState({})

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

  return (
    <PlayerContext.Provider
      value={{
        player: playing,
        setSong: setSongHandler,
        song: song,
        startPlaying: startPlayingHandler,
        stopPlaying: stopPlayingHandler,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  )
}
