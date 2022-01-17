import React, { useContext, useState, useEffect } from 'react'
import styles from './SongListItem.module.css'
import { PlayerContext } from '../../store/playerContext'
import SongListOption from './SongListOptions'

const SongListItem = ({ index, song, setPlaylist, artist, playlist }) => {
  const player = useContext(PlayerContext)
  const [songPlaying, setSongPlaying] = useState(false)

  useEffect(() => {
    if (player.currentSongPlaying === song.videoId) {
      setSongPlaying(true)
      return
    }
    setSongPlaying(false)
  }, [player.currentSongPlaying])

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000)
    var seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }

  function getArtistName() {
    let name = song.artist?.name ? song.artist.name : song.author
    if (!name) name = artist
    return name
  }

  return (
    <div className={`${styles.item} ${songPlaying && styles.active} `}>
      {song && (
        <>
          <section>
            <h2>
              {song.name?.substring(0, 20).replace('Video', '')}
              {song.name?.length >= 21 ? ' ...' : ''}
            </h2>
            <h4>
              {getArtistName()} - {millisToMinutesAndSeconds(song.duration)}
            </h4>
          </section>

          <figure className={styles.figure}>
            <div className={styles.play}>
              {songPlaying ? (
                <i
                  className='fas fa-pause'
                  onClick={() => console.log(player.ytPlayer.pauseVideo())}
                ></i>
              ) : (
                <i
                  className='fas fa-play'
                  onClick={() =>
                    setPlaylist({ index: index, img: song.thumbnails })
                  }
                ></i>
              )}
            </div>
          </figure>
          <SongListOption song={song} playlist={playlist} index={index} />
        </>
      )}
    </div>
  )
}

export default SongListItem
