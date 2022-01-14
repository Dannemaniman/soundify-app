import React from 'react'
import { useNavigate } from 'react-router-dom'
import s from './ArtistSlider.module.css'

const ArtistSlider = ({ artists, header }) => {
  const artsistsArray = artists
  const searchTerm = header.substring(
    header.indexOf('"') + 1,
    header.lastIndexOf('"')
  )
  let navigate = useNavigate()

  const handleClick = (query) => {
    navigate(`/artist/${query}`, { replace: true })
  }

  const handleClickToViewMore = (query) => {
    navigate(`/search/show-more?query=artists&name=${query}`)
  }

  function getLastThumbnail(ele) {

    //Taking last index because extern API returns the best quality image at last index.
    const last = ele.thumbnails?.length - 1

    if (ele.thumbnails?.url) {
      return ele.thumbnails.url
    }
    else if (ele?.thumbnails[last].url) {
      return ele.thumbnails[last].url
    }
  }


  return (
    <>
      <div className={s.artistSliderContainer}>
        <h1>{header}</h1>
        <div className={s.cardsContainer}>
          {artsistsArray.map((ele, index) => {
            return (
              <div
                className={s.artistCard}
                key={index}
                style={{
                  backgroundImage: `url(${getLastThumbnail(ele)})`,
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
