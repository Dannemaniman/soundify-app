import React, { useEffect, useState, useRef, useContext, useCallback, useMemo } from 'react'
import styles from './YoutubePlayer.module.css'
import { PlayerContext } from '../../store/playerContext'

const YoutubePlayer = (props) => {
  const context = useContext(PlayerContext)

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
        (player.getCurrentTime() / player.getDuration()) * 100 + '%'
      )
    }, 500)
  }

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
  function pickSongTime(e) {
    let coordStart = progressBar.current.getBoundingClientRect().left
    let coordEnd = e.pageX
    let percent = (coordEnd - coordStart) / progressBar.current.offsetWidth

    return player.getDuration() * percent
  }

  const pickTime = (e) => {
    player.seekTo(pickSongTime(e), true)
  }

  return (
    <>
      {song ? (
        <div className={styles.playerContainer}>
          <div id='yt-player' className={styles.container}></div>

          <div className={styles.songContainer}>
            <img className={styles.img} src={song.img?.url} alt='' />
            <div className={styles.name}>
              <p className={styles.artistName}>{song.artist?.name}</p>
              <p className={styles.songName}>{song.name}</p>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.next}>
              <i className='fas fa-step-backward'></i>
            </button>
            <PlayPaus />
            <button className={styles.next}>
              <i className='fas fa-step-forward'></i>
            </button>
          </div>

          <div className={styles.progressContainer}>
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
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default YoutubePlayer
