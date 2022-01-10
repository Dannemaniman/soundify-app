import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import s from './SongSlider.module.css'
import SongListItem from '../songlist/SongListItem'
import { PlayerContext } from '../../store/playerContext'

const SongSlider = ({ songs, header }) => {

  const artsistsArray = songs
  const searchTerm = header.substring(header.indexOf('"') + 1, header.lastIndexOf('"'))
  let navigate = useNavigate()

  const handleClick = (query) => {
    navigate(`/artist/${query}`, { replace: true })
  }

  const handleClickToViewMore = (query) => {
    navigate(`/search/show-more?query=songs&name=${query}`, { replace: true })
  }

  return (
    <>
      <div className={s.songSliderContainer}>
        <h1 >{header}</h1>
        <div className={s.cardsContainer}>
          {artsistsArray.map((song, index) => {
            console.log(song)
            return (
              <div className={s.songCard} key={index}
                onClick={() => handleClick(song.browseId)}
              >
                <h2 className={s.songTitle} key={index}>{song.name}</h2>
                <figure
                  className={s.figure}
                >
                  <div className={s.play}>
                    <i className='fas fa-play'></i>
                  </div>
                </figure>

              </div>
            )

          })}
          <p style={{ textDecoration: "underline" }} onClick={() => { handleClickToViewMore(searchTerm) }}>View more</p>
        </div>
      </div>

    </>
  )

}



export default SongSlider