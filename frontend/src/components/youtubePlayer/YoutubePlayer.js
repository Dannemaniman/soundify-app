import React, { useEffect, useState, useRef } from 'react'
import styles from './YoutubePlayer.module.css'

const YoutubePlayer = (props) => {
  const end = useRef(null)
  const start = useRef(null)
  const progressBarDone = useRef(null)
  const progressBar = useRef(null)
  const timePlayed = useRef(null)

  const [playing, setplaying] = useState(false)
  const [player, setplayer] = useState(null)

  const [song, setsong] = useState(null)

  let durationInterval

  //Detta är bara tillfälligt för att testa denna component.
  useEffect(() => {
    const fetch1 = async () => {
      let response = await fetch(
        'https://yt-music-api.herokuapp.com/api/yt/songs/nothing%20else%20matters'
      )
      setsong(await response.json())
    }
    fetch1()
  }, [])

  let playerr

  useEffect(() => {
    console.log(song)
    if (!song) return
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'

      window.onYouTubeIframeAPIReady = loadVideo

      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    } else {
      console.log('load video')
      loadVideo()
    }
  }, [song])

  const loadVideo = () => {
    // const { videoId } = props

    playerr = new window.YT.Player(`yt-player`, {
      videoId: song.content[0].videoId,
      events: {
        onReady: onPlayerReady,
      },
    })
    setplayer(playerr)
  }

  const onPlayerReady = () => {
    playerr.playVideo()
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

  if (player) {
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
    }, 1000)
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
            <img
              className={styles.img}
              src={song.content[0].thumbnails[0].url}
              alt=''
            />
            <div className={styles.name}>
              <p className={styles.artistName}>{song.content[0].artist.name}</p>
              <p className={styles.songName}>{song.content[0].name}</p>
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
