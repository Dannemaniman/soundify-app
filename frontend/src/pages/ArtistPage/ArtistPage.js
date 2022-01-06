import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import HeroImg from '../../components/heroImg/HeroImg'
import SongList from '../../components/songlist/SongList'
import Carousel from '../../components/carousel/Carousel'
import styles from './ArtistPage.module.css'

const ArtistPage = () => {
  const param = useParams()

  const [artist, setartist] = useState('')
  const [viewMore, setviewMore] = useState(false)

  //Detta är bara tillfälligt för att testa denna page.
  useEffect(() => {
    const fetch1 = async () => {
      let response = await fetch(
        'https://yt-music-api.herokuapp.com/api/yt/artist/UCGexNm_Kw4rdQjLxmpb2EKw'
      )
      setartist(await response.json())
    }

    fetch1()
  }, [param])

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
              {artist.description}
            </p>
            <button
              className={styles.button}
              onClick={() => setviewMore(!viewMore)}
            >
              {viewMore ? 'View less' : 'View more'}
            </button>
          </section>

          <section className={styles.songs}>
            <SongList
              songs={artist.products.songs.content}
              header={`Top 5 songs by  ${artist.name}`}
              thumbnails={artist.thumbnails}
            />
          </section>

          <Carousel title={'albums'} list={artist.products.albums.content} />
          <Carousel title={'singles'} list={artist.products.singles.content} />
        </div>
      )}
    </>
  )
}

export default ArtistPage
