import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom"

import HeroImg from '../../components/heroImg/HeroImg'
import SongList from '../../components/songlist/SongList'
import Carousel from '../../components/carousel/Carousel'
import styles from './ArtistPage.module.css'

const ArtistPage = () => {
  const param = useParams()
  const navigate = useNavigate()

  const [artist, setartist] = useState('')
  const [viewMore, setviewMore] = useState(false)
  const [albums, setAlbums] = useState([])
  const [songs, setSongs] = useState([])
  const [singles, setSingles] = useState("")

  useEffect(() => {
    const fetchArtist = async () => {

      const response = await fetch(
        `https://yt-music-api.herokuapp.com/api/yt/artist/${param.id}`
      )
      const artists = await response.json()

      setartist(artists)
      setAlbums(artists.products['albums']?.content)
      setSingles(artists.products['single']?.content)
      setSongs(await fetchMoreSongs(artists.name))
    }

    const fetchMoreSongs = async (name) => {
      console.log(name)
      let response = await fetch(
        `https://yt-music-api.herokuapp.com/api/yt/videos/${name.toLowerCase()}`
      )
      const res = await response.json()
      const moreSongs = res.content
      console.log(moreSongs)

      //Returns array with songs
      return moreSongs
    }

    fetchArtist()

  }, [param.id])




  return (
    <>
      {artist && (
        <div className={styles.artistpage}>
          <HeroImg imgUrl={artist.thumbnails[0].url} caption={artist.name} />

          <section className={styles.description}>
            <h1 style={{ paddingBottom: '1rem' }}>About {artist.name}</h1>
            <p
              className={styles.text}
              style={{ height: viewMore ? 'auto' : null }}
            >
              {artist.description ? artist.description : "No available info"}
            </p>
            <button
              className={styles.button}
              onClick={() => setviewMore(!viewMore)}
            >
              {viewMore ? 'View less' : 'View more'}
            </button>
          </section>

          {songs.length > 0 &&
            <section className={styles.songs}>
              {console.log('true!')}
              <SongList
                songs={songs.slice(0, 5)}
                header={`Top 5 songs by  ${artist.name}`}
                thumbnails={artist.thumbnails}
              />
              <p style={{ textDecoration: "underline" }} onClick={() => { navigate(`/search/show-more?query=songs&name=${artist.name}`) }}>View more</p>
            </section>}

          {albums && <Carousel title={'albums'} list={albums} />}
          {singles && <Carousel title={'singles'} list={singles} />}
        </div>
      )}
    </>
  )
}

export default ArtistPage
