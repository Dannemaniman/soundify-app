import React from 'react'
import { useNavigate } from "react-router-dom"
import s from './AlbumSlider.module.css'

const AlbumSlider = ({ albums, header }) => {

  const albumsArray = albums
  const searchTerm = header.substring(header.indexOf('"') + 1, header.lastIndexOf('"'))
  let navigate = useNavigate()

  const handleClick = (albumId) => {
    navigate(`/artist/${searchTerm}/album/${albumId}`)
  }

  const handleClickToViewMore = (query) => {
    navigate(`/search/show-more?query=albums&name=${query}`, { replace: true })
  }

  return (
    <>
      <div className={s.albumSliderContainer}>
        <h1>{header}</h1>
        {albumsArray && <div className={s.cardsContainer}>
          {albumsArray.map((ele, index) => {
            return (

              <div className={s.albumCard} key={index} style={{
                backgroundImage: `url(${ele.thumbnails[2].url})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }} onClick={() => handleClick(ele.browseId)} >
                <h2 className={s.albumTitle} key={ele.name + index}>{ele.name}</h2>
              </div>)
          })}
          <p style={{ textDecoration: "underline" }} onClick={() => { handleClickToViewMore(searchTerm) }}>View more</p>
        </div>}
      </div>

    </>
  )

}

export default AlbumSlider