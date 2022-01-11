import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom"

import HeroImg from '../../components/heroImg/HeroImg'
import SongList from '../../components/songlist/SongList'
import Carousel from '../../components/carousel/Carousel'
import styles from './ArtistPage.module.css'

const ArtistPage = () => {
  const param = useParams()
  let navigate = useNavigate()

  const [artist, setartist] = useState('')
  const [viewMore, setviewMore] = useState(false)
  const [albums, setAlbums] = useState([])
  const [songs, setSongs] = useState("")
  const [singles, setSingles] = useState("")

  useEffect(() => {
    const fetchArtist = async () => {

      let response = await fetch(
        ` https://yt-music-api.herokuapp.com/api/yt/artist/${param.id}`
      )
      const data = await response.json()
      setartist(data)
      sortFetchedData(data.products)
      console.log(data)
    }
    /* ROBINS -----> fetchArtist()
      let artists = await response.json()
      artists.products.songs.content = await Promise.all(
        artists.products.songs.content.map(async (song) => {
          let url =
            'https://yt-music-api.herokuapp.com/api/yt/song/' + song.videoId
          let result = await fetch(url)
          return result.json()
        })
      )
      setartist(artists)
    } */
    fetchArtist()
  }, [param])

  const sortFetchedData = (products) => {
    let newSongs = []
    let newAlbums = []
    let newSingles = []

    for (const property in products) {
      if (property === 'songs' || property === 'videos') {
        newSongs = products[property].content
      } else if (property === 'albums') {
        newAlbums = products[property].content
      } else if (property === 'single') {
        newSingles = products[property].content
      }
    }

    setSongs(newSongs)
    setAlbums(newAlbums)
    setSingles(newSingles)
  }

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
              {artist.description ? artist.description : "No avaiable info"}
            </p>
            <button
              className={styles.button}
              onClick={() => setviewMore(!viewMore)}
            >
              {viewMore ? 'View less' : 'View more'}
            </button>
          </section>

          {songs.length > 0 && artist &&
            <section className={styles.songs}>
              <SongList
                songs={songs.slice(0, 5)}
                header={`Top 5 songs by  ${artist.name}`}
                thumbnails={artist.thumbnails}
              />
              <p style={{ textDecoration: "underline" }} onClick={() => { navigate(`/search/show-more?query=songs&name=${artist.name}`) }}>View more</p>
            </section>}


          {/* ROBINS-----> <section className={styles.songs}>
            <SongList
              songs={artist.products.songs.content}
              header={`Top 5 songs by  ${artist.name}`}
              thumbnails={artist.thumbnails}
              artist={artist.name}
            />
          </section> */}

          {albums.length > 0 && <Carousel title={'albums'} list={albums} />}
          {singles.length > 0 && <Carousel title={'singles'} list={singles} />}
        </div>
      )}
    </>
  )
}

export default ArtistPage
