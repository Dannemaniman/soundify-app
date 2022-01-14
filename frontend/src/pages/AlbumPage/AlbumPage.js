import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

import HeroImg from '../../components/heroImg/HeroImg'
import SongList from '../../components/songlist/SongList'
import Carousel from '../../components/carousel/Carousel'
import styles from './ArtistPage.module.css'

const AlbumPage = () => {
  const param = useParams()
  const navigate = useNavigate()

  const [album, setAlbum] = useState(null)
  const [artist, setArtist] = useState('')

  useEffect(() => {
    const fetchAlbum = async () => {
      const response = await fetch(
        `https://yt-music-api.herokuapp.com/api/yt/album/${param.browseId}`
      )
      const newAlbum = await response.json()
      if (album?.error) {
        navigate(-1)
      }
      setAlbum(newAlbum)
    }

    fetchAlbum()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id])

  function getLastThumbnail() {
    const last = album?.thumbnails?.length - 1
    return album.thumbnails[last].url
  }

  return (
    <>
      {album && (
        <div className={styles.artistpage}>
          <HeroImg imgUrl={getLastThumbnail()} caption={album.title} />

          {
            <section className={styles.songs}>
              <SongList
                songs={album.tracks}
                thumbnails={album.thumbnails}
                artist={album.artist[0].name}
              />
            </section>
          }
        </div>
      )}
    </>
  )
}

export default AlbumPage
