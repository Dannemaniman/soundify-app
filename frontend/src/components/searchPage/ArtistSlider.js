import React from 'react'
import { useNavigate } from 'react-router-dom'
import s from './ArtistSlider.module.css'
import { getThumbnailUrl } from '../utils/mediaUtils'

const ArtistSlider = ({ artists, header }) => {
  const artsistsArray = artists

  const searchTerm = header.substring(
    header.indexOf('"') + 1,
    header.lastIndexOf('"')
  )
  let navigate = useNavigate()

  const handleClick = (query) => {
    navigate(`/artist/${query}`)
  }

  const handleClickToViewMore = (query) => {
    navigate(`/search/show-more?query=artists&name=${query}`)
  }


  return (
    <>
      <div className={s.artistSliderContainer}>
        <h1>{header}</h1>
        <div className={s.cardsContainer}>
          {artsistsArray.map((ele, index) => {
            console.log(ele)
            return (
              <div
                className={s.artistCard}
                key={index}
                style={{
                  backgroundImage: `url(${getThumbnailUrl(ele)})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
                onClick={() => handleClick(ele.browseId)}
              >
                <h2 className={s.artistTitle} key={index}>
                  {ele.name}
                </h2>
              </div>
            )
          })}
          <p
            style={{ textDecoration: 'underline' }}
            onClick={() => {
              handleClickToViewMore(searchTerm)
            }}
          >
            View more
          </p>
        </div>
      </div>
    </>
  )
}

export default ArtistSlider
