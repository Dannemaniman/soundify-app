import React, { useEffect, useState } from 'react'
import styles from './YoutubePlayer.module.css'

const YoutubePlayer = (props) => {
  const [playing, setplaying] = useState(false)
  const [player, setplayer] = useState(null)

  let playerr

  useEffect(() => {
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
  }, [])

  const loadVideo = () => {
    const { videoId } = props

    playerr = new window.YT.Player(`yt-player`, {
      videoId: videoId,
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

  return (
    <div className={styles.playerContainer}>
      <div id='yt-player' className={styles.container}></div>

      {/* <button onClick={onPlayerReady}>Play</button>
      <button onClick={pausePlayer}>Pause</button> */}

      <div className={styles.buttonContainer}>
        <button className={styles.next}>
          <i className='fas fa-step-backward'></i>
        </button>
        <PlayPaus />
        <button className={styles.next}>
          <i className='fas fa-step-forward'></i>
        </button>
      </div>
    </div>
  )
}

export default YoutubePlayer
