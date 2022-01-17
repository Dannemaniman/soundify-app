import React from 'react'
import { useNavigate } from "react-router-dom"
import { getThumbnailUrl } from '../utils/mediaUtils'
import s from './AlbumSlider.module.css'

const AlbumSlider = ({ albums, header }) => {

  const albumsArray = albums
  const searchTerm = header.substring(header.indexOf('"') + 1, header.lastIndexOf('"'))
  let navigate = useNavigate()

  const handleClick = (album) => {
    console.log(album)
    navigate(`/artist/${album.artist.toLowerCase()}/album/${album.browseId}`)
  }

  const handleClickToViewMore = (query) => {
    navigate(`/search/show-more?query=albums&name=${query}`)
  }

  return (
    <>
      <div className={s.albumSliderContainer}>
        <h1>{header}</h1>
        {albumsArray && <div className={s.cardsContainer}>
          {albumsArray.map((album, index) => {
            return (

              <div className={s.albumCard} key={index} style={{
                backgroundImage: `url(${getThumbnailUrl(album)})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }} onClick={() => handleClick(album)} >
                <h2 className={s.albumTitle} key={album.name + index}>{album.name}</h2>
              </div>)
          })}
          <p style={{ textDecoration: "underline" }} onClick={() => { handleClickToViewMore(searchTerm) }}>View more</p>
        </div>}
      </div>

    </>
  )

}

export default AlbumSlider