import React, { useEffect, useState } from 'react'
import s from './AlbumSlider.module.css'

const AlbumSlider = ({ albums, header }) => {

  const albumsArray = albums

  return (
    <>

      <div className={s.albumSliderContainer}>
        <h1>{header}</h1>
        <div className={s.cardsContainer}>
          {albumsArray.map((ele, index) => {
            return (

              <div className={s.albumCard} key={index} style={{
                backgroundImage: `url(${ele.thumbnails[2].url})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}>
                <h2 className={s.albumTitle} key={ele.name + index}>{ele.name}</h2>
              </div>)
          })}
        </div>
      </div>

    </>
  )

}

export default AlbumSlider