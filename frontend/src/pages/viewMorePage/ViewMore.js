import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useLocation } from "react-router-dom"
import s from './ViewMore.module.css'

import AlbumSlider from '../../components/searchPage/AlbumSlider'
import ArtistSlider from '../../components/searchPage/ArtistSlider'
import SongList from '../../components/songlist/SongList'

const ViewMore = () => {

  const query = new URLSearchParams(useLocation().search)
  const type = query.get("query")
  const name = query.get("name")

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


  return (
    <div className={isLoading ? "loader" : s.container}>
      <h1>{type.charAt(0).toUpperCase()}{type.slice(1)} found:</h1>
      {console.log(dataToRender)}
      {!isLoading && dataToRender.map((ele, index) => {
        return (
          <div className={s.viewMoreItem} key={index}>
            <div className={s.mainContent}>
              <h1 className={s.artistTitle}>{ele.name.substring(0, 25)} </h1>
              <img src={ele.thumbnails[0].url} alt="artist or album" />
            </div>
            {ele.artist && <p>By: {ele.artist}</p>}
            {!ele.artist && <p>Go to artist page</p>}
            {/* <button>{type.charAt(0).toUpperCase()}{type.slice(1, -1)}</button> */}
          </div>)
      })}
    </div>
  )

}

export default ViewMore