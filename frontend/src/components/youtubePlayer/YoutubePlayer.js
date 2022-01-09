<<<<<<< HEAD
import React, { useEffect, useState, useRef, useContext, useCallback, useMemo } from 'react'
import styles from './YoutubePlayer.module.css'
=======
import React, { useEffect, useState, useRef, useContext } from 'react'
import styles from './YoutubePlayer.module.css'
import YouTube from 'react-youtube'
>>>>>>> 0daea0579d2636e098cfcf1e7c98b8d9d3c3100f
import { PlayerContext } from '../../store/playerContext'

const YoutubePlayer = (props) => {
  const context = useContext(PlayerContext)

<<<<<<< HEAD
  const progressBarDone = useRef(null)
  const progressBar = useRef(null)
  const timePlayed = useRef(null)

  const [playing, setplaying] = useState(false)

  const [song, setSong] = useState(null)

  let durationInterval

  let player

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'

      window.onYouTubeIframeAPIReady = loadPlayer

      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    } else {
      loadPlayer()
    }
  }, [song])

    useEffect(() => {
    if (!context.song) return
    setSong(context.song)
    console.log(context.song)
  
    setTimeout(() => {
      if (player) {
        player.loadVideoById(context.song.videoId)
        setTimes()
        }
    }, 10)
  }, [context.song])

  const loadPlayer =  useCallback(() => {
    player = new window.YT.Player(`yt-player`, {
      videoId: song ? song.song.videoId : '',
      events: {
        onReady: useUrlParams,
      },
    })
    console.log(player)
  }, []) 



  const setTimes = () => {
    clearInterval(durationInterval)
    durationInterval = setInterval(() => {
      if (player.getCurrentTime() === null) return

      let currentTime = Math.ceil(player.getCurrentTime())
      let seconds =
        currentTime % 60 < 10
          ? '0' + Math.ceil(currentTime % 60)
          : Math.ceil(currentTime % 60)
      let time = `${Math.ceil(currentTime / 60 - 1)}:${seconds}`
      if (time === '-1:00') {
        timePlayed.current.innerHTML = '0:00'
      } else {
        timePlayed.current.innerHTML = time
      }

      progressBarDone.current.style.setProperty(
        'width',
=======
  const progressBar = useRef(null)

  const [playing, setplaying] = useState(false)
  const [player, setplayer] = useState(null)
  const [hide, sethide] = useState(false)
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
>>>>>>> 0daea0579d2636e098cfcf1e7c98b8d9d3c3100f
        (player.getCurrentTime() / player.getDuration()) * 100 + '%'
      )
    }, 500)
  }

<<<<<<< HEAD
  function useUrlParams() {
    if (song) {
      setTimeout(() => {
        player.loadVideoById(song.videoId);
      }, 10);
    }
  }

  const onPlayerReady = () => {
    //setsong(context)
    player.loadVideoById(context.song.videoId)
    if (window.YT.PlayerState.PLAYING) setplaying(true)
=======
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
>>>>>>> 0daea0579d2636e098cfcf1e7c98b8d9d3c3100f
  }

  const pausePlayer = () => {
    player.pauseVideo()
    setplaying(false)
  }
  const startPlayer = () => {
    player.playVideo()
    setplaying(true)
  }

<<<<<<< HEAD
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
  function pickSongTime(e) {
=======
  //Change time on song with progress bar
  function changedSongTime(e) {
>>>>>>> 0daea0579d2636e098cfcf1e7c98b8d9d3c3100f
    let coordStart = progressBar.current.getBoundingClientRect().left
    let coordEnd = e.pageX
    let percent = (coordEnd - coordStart) / progressBar.current.offsetWidth

    return player.getDuration() * percent
  }

<<<<<<< HEAD
  const pickTime = (e) => {
    player.seekTo(pickSongTime(e), true)
=======
  const changeTime = (e) => {
    player.seekTo(changedSongTime(e), true)
  }

  const hideOrShow = () => {
    sethide(!hide)
  }
  const hidecss = () => {
    let css = {}
    if (hide) {
      css = {
        top: 'calc(100vh)',
        height: '0px',
        border: 'none',
        padding: '0',
      }
    }
    return css
>>>>>>> 0daea0579d2636e098cfcf1e7c98b8d9d3c3100f
  }

  return (
    <>
      {song ? (
<<<<<<< HEAD
        <div className={styles.playerContainer}>
          <div id='yt-player' className={styles.container}></div>

          <div className={styles.songContainer}>
            <img className={styles.img} src={song.img?.url} alt='' />
            <div className={styles.name}>
              <p className={styles.artistName}>{song.artist?.name}</p>
              <p className={styles.songName}>{song.name}</p>
=======
        <div className={styles.playerContainer} style={hidecss()}>
          <YouTube
            videoId={song.song.videoId}
            opts={opts}
            onReady={onPlayerReady}
            onStateChange={onChange}
          />

          <div className={styles.hide} onClick={hideOrShow}>
            {!hide && <i className='fas fa-chevron-down'></i>}
            {hide && <i className='fas fa-chevron-up'></i>}
          </div>

          <div className={styles.songContainer}>
            <img className={styles.img} src={song.thumbnail?.url} alt='' />
            <div className={styles.name}>
              <p className={styles.artistName}>{song.song.artist?.name}</p>
              <p className={styles.songName}>{song.song?.name}</p>
>>>>>>> 0daea0579d2636e098cfcf1e7c98b8d9d3c3100f
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.next}>
<<<<<<< HEAD
              <i className='fas fa-step-backward'></i>
            </button>
            <PlayPaus />
            <button className={styles.next}>
=======
              <i className='fas fa-step-backward' onClick={prevSong}></i>
            </button>

            {playing && (
              <button className={styles.next} onClick={pausePlayer}>
                <i className='fas fa-pause'></i>
              </button>
            )}
            {!playing && (
              <button className={styles.next} onClick={startPlayer}>
                <i className='fas fa-play'></i>
              </button>
            )}

            <button className={styles.next} onClick={nextSong}>
>>>>>>> 0daea0579d2636e098cfcf1e7c98b8d9d3c3100f
              <i className='fas fa-step-forward'></i>
            </button>
          </div>

          <div className={styles.progressContainer}>
<<<<<<< HEAD
            <span className='start'></span>
            <p ref={timePlayed}>0:40</p>
            <div
              className={styles.progressBar}
              ref={progressBar}
              onClick={pickTime}
            >
              <div
                className={styles.progressBarDone}
                ref={progressBarDone}
              ></div>
            </div>
            <p id='time-duration'>3:42</p>
=======
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
>>>>>>> 0daea0579d2636e098cfcf1e7c98b8d9d3c3100f
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default YoutubePlayer
