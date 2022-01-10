import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useLocation, useNavigate } from "react-router-dom"
import s from './ViewMore.module.css'
import backIcon from '../../assets/icons/back.png'

const ViewMore = () => {

  let navigate = useNavigate()

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

  const handleGoback = () => {
    navigate(`/search/${name}`, { replace: true })
  }


  return (
    <div className={s.container}>
      {console.log(dataToRender)}
      <div className={s.header} onClick={() => { handleGoback() }}>
        <img src={backIcon} alt="" />
        <h1>{type.charAt(0).toUpperCase()}{type.slice(1)} found:</h1>
      </div>
      {isLoading && <div className={isLoading ? "loader" : ""}></div>}
      {!isLoading && dataToRender.map((ele, index) => {
        return (
          <div className={s.viewMoreItem} key={index}>
            <div className={s.mainContent}>
              <h1 className={s.artistTitle}>{ele.name.substring(0, 20)} {ele.name.length > 20 ? "..." : ""}</h1>
              <img src={ele.thumbnails[0].url} alt="artist or album" />
            </div>
            {typeof ele.artist === 'string' && <p>By: {ele.artist}</p>}
            {!ele.artist && <p>Go to artist page</p>}
            {/* <button>{type.charAt(0).toUpperCase()}{type.slice(1, -1)}</button> */}
          </div>)
      })}
    </div>
  )

}

export default ViewMore