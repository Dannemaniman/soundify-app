import React, { useEffect, useState, useRef, useContext } from 'react'
import styles from './YoutubePlayer.module.css'
import YouTube from 'react-youtube'
import { PlayerContext } from '../../store/playerContext'

const YoutubePlayer = (props) => {
  const context = useContext(PlayerContext)

  const progressBar = useRef(null)

  const [playing, setplaying] = useState(false)
  const [player, setplayer] = useState(null)
  const [endTime, setendTime] = useState('0:00')
  const [startTime, setstartTime] = useState('0:00')
  const [doneProgress, setdoneProgress] = useState('')

  const [song, setsong] = useState(null)
  const [index, setindex] = useState(0)
  const [playlist, setplaylist] = useState([])

  let checkTime
  let style

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
    },
  }

  useEffect(() => {
    if (!context.playlist.content?.songs) return

    setindex(context.playlist.index)
    setplaylist(context.playlist.content.songs)
    setsong({
      song: context.playlist.content.songs[context.playlist.index],
      thumbnail: context.playlist.content.thumbnails[1],
    })
  }, [context])

  const setTimes = () => {
    clearInterval(checkTime)
    checkTime = setInterval(() => {
      if (player.getCurrentTime() === null) return

      setstartTime(getTime(player.getCurrentTime()))
      setdoneProgress(
        (player.getCurrentTime() / player.getDuration()) * 100 + '%'
      )
    }, 500)
  }

  const onPlayerReady = (event) => {
    event.target.pauseVideo()
    setplayer(event.target)
  }

  const onChange = (event) => {
    if (event.data == window.YT.PlayerState.ENDED) {
      return nextSong()
    }
    setTimes()
    setendTime(getTime(event.target.getDuration()))
  }

  const nextSong = () => {
    if (index + 1 >= playlist.length) {
      setindex((prevIndex) => prevIndex - (playlist.length - 1))
      player.loadVideoById(playlist[0].videoId)
      setplaying(true)
      setsong((prevState) => ({ ...prevState, song: playlist[0] }))
      return
    }

    player.loadVideoById(playlist[index + 1].videoId)
    setplaying(true)
    setsong((prevState) => ({ ...prevState, song: playlist[index + 1] }))
    setindex((prevIndex) => prevIndex + 1)
  }

  const prevSong = () => {
    if (index - 1 < 0) {
      setindex((prevIndex) => prevIndex + (playlist.length - 1))
      player.loadVideoById(playlist[playlist.length - 1].videoId)
      setplaying(true)
      setsong((prevState) => ({
        ...prevState,
        song: playlist[playlist.length - 1],
      }))
      return
    }

    player.loadVideoById(playlist[index - 1].videoId)
    setplaying(true)
    setsong((prevState) => ({ ...prevState, song: playlist[index - 1] }))
    setindex((prevIndex) => prevIndex - 1)
  }

  const getTime = (secondsTotal) => {
    var totalSec = secondsTotal
    var minutes = parseInt(totalSec / 60) % 60
    var seconds = Math.ceil(totalSec % 60)

    return (
      (minutes < 1 ? '0' : minutes) +
      ':' +
      (seconds < 10 ? '0' + seconds : seconds)
    )
  }

  const pausePlayer = () => {
    player.pauseVideo()
    setplaying(false)
  }
  const startPlayer = () => {
    player.playVideo()
    setplaying(true)
  }

  const PlayPaus = () => {
    if (!playing) {
      return (
        <button className={styles.next} onClick={startPlayer}>
          <i className='fas fa-play'></i>
        </button>
      )
    } else {
      return (
        <button className={styles.next} onClick={pausePlayer}>
          <i className='fas fa-pause'></i>
        </button>
      )
    }
  }

  //Change time on song with progress bar
  function changedSongTime(e) {
    let coordStart = progressBar.current.getBoundingClientRect().left
    let coordEnd = e.pageX
    let percent = (coordEnd - coordStart) / progressBar.current.offsetWidth

    return player.getDuration() * percent
  }

  const changeTime = (e) => {
    player.seekTo(changedSongTime(e), true)
  }

  return (
    <>
      {song ? (
        <div className={styles.playerContainer}>
          <YouTube
            videoId={song.song.videoId}
            opts={opts}
            onReady={onPlayerReady}
            onStateChange={onChange}
          />

          <div className={styles.songContainer}>
            <img className={styles.img} src={song.thumbnail?.url} alt='' />
            <div className={styles.name}>
              <p className={styles.artistName}>{song.song.artist?.name}</p>
              <p className={styles.songName}>{song.song?.name}</p>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.next}>
              <i className='fas fa-step-backward' onClick={prevSong}></i>
            </button>
            <PlayPaus />
            <button className={styles.next} onClick={nextSong}>
              <i className='fas fa-step-forward'></i>
            </button>
          </div>

          <div className={styles.progressContainer}>
            <p>{startTime}</p>
            <div
              className={styles.progressBar}
              ref={progressBar}
              onClick={changeTime}
            >
              <div
                className={styles.progressBarDone}
                style={{ width: doneProgress }}
              ></div>
            </div>
            <p>{endTime}</p>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default YoutubePlayer
