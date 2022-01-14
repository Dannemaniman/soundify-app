import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import s from './ViewMore.module.css'
import backIcon from '../../assets/icons/back.png'
import PlayBtn from '../../components/songlist/PlayBtn'
import SongListOption from '../../components/songlist/SongListOptions'

const ViewMore = () => {
  let navigate = useNavigate()

  const query = new URLSearchParams(useLocation().search)
  const type = query.get('query')
  const name = query.get('name')

  const [dataToRender, setDataToRender] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchSearch = async () => {
      setIsLoading(true)

      let response = await fetch(
        `https://yt-music-api.herokuapp.com/api/yt/${type}/${name}`
      )

      let res = await response.json()
      setDataToRender(res.content)
      if (res) setIsLoading(false)
    }
    fetchSearch()
  }, [type, name])

  const handleGoback = () => {
    navigate(-1)
  }

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000)
    var seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }

  function goTo(ele) {
    if (ele.type === 'album' || ele.type === 'single') {
      navigate(`/artist/${ele.artist}/album/${ele.browseId}`)
    } else if (ele.type === 'artist') {
      navigate(`/artist/${ele.browseId}`)
    }
  }

  function getLastThumbnail(ele) {
    //Taking last index because extern API returns the best quality image at last index.
    const last = ele.thumbnails?.length - 1

    if (ele.thumbnails?.url) {
      return ele.thumbnails.url
    } else if (ele?.thumbnails[last].url) {
      return ele.thumbnails[last].url
    }
  }

  return (
    <div className={s.container}>
      <div
        className={s.header}
        onClick={() => {
          handleGoback()
        }}
      >
        <img src={backIcon} alt='' />
        <h1>
          {type.charAt(0).toUpperCase()}
          {type.slice(1)} found:
        </h1>
      </div>
      {isLoading && <div className={isLoading ? 'loader' : ''}></div>}
      {!isLoading &&
        dataToRender.map((ele, index) => {
          return (
            <div
              className={s.viewMoreItem}
              key={index}
              onClick={() => {
                goTo(ele)
              }}
            >
              <div className={s.mainContent}>
                <h1
                  className={ele.type !== 'song' ? s.artistTitle : s.songTitle}
                >
                  {ele.name.substring(0, 20)}{' '}
                  {ele.name.length > 20 ? '...' : ''}
                </h1>

                {ele.type !== 'song' && (
                  <img src={getLastThumbnail(ele)} alt='artist or album' />
                )}
                {ele.type === 'song' && (
                  <div className={s.interaction}>
                    <PlayBtn
                      songs={dataToRender}
                      index={index}
                      song={ele}
                      thumbnails={ele.thumbnails}
                    />
                    <SongListOption song={ele} />
                  </div>
                )}
              </div>
              {typeof ele.artist === 'string' && <p>By: {ele.artist}</p>}
              {!ele.artist && <p>Go to artist page</p>}
              {ele.type === 'song' && (
                <p>
                  {ele.artist?.name ? ele.artist?.name : ''} -{' '}
                  {millisToMinutesAndSeconds(ele.duration)}
                </p>
              )}
            </div>
          )
        })}
    </div>
  )
}

export default ViewMore
