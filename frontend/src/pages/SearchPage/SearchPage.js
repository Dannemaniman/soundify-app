import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import { useLocation, useNavigate } from "react-router-dom"

import AlbumSlider from '../../components/searchPage/AlbumSlider'
import ArtistSlider from '../../components/searchPage/ArtistSlider'
import SongSlider from '../../components/searchPage/SongSlider'

import s from './SearchPage.module.css'

const SearchPage = () => {
  const param = useParams()
  let navigate = useNavigate()

  let timer
  const waitTime = 800

  const [search, setSearch] = useState(param.query ? param.query : "")
  const [artists, setArtist] = useState([])
  const [albums, setAlbums] = useState([])
  const [songs, setSongs] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {

    const fetchSearch = async () => {
      if (!search) return
      setIsLoading(true)

      let response = await fetch(
        `https://yt-music-api.herokuapp.com/api/yt/search/${search}`
      )
      let res = await response.json()

      sortFetchedData(res.content)
      if (res) setIsLoading(false)
      navigate(`/search/${search}`)
    }
    fetchSearch()

  }, [navigate, search])


  const handleChangeInput = async (e) => {

    if (e.key === "Enter") setSearch(e.target.value)
    clearTimeout(timer)

    //Waiting for user finished typing
    timer = setTimeout(() => {
      if (!e.target.value.length > 0) {
        resetAllSearchTerms()
      }
      setSearch(e.target.value)
    }, waitTime)

  }


  const sortFetchedData = (data) => {
    let newSongs = []
    let newArtists = []
    let newAlbums = []

    data.forEach((element) => {
      if (element.type === 'song' || element.type === 'single') {
        newSongs.push(element)
      } else if (element.type === 'artist') {
        newArtists.push(element)
      } else if (element.type === 'album') {
        newAlbums.push(element)
      }
    })

    setArtist(newArtists)
    setSongs(newSongs)
    setAlbums(newAlbums)
  }


  const resetAllSearchTerms = () => {
    setArtist([])
    setSongs([])
    setAlbums([])
  }

  return (
    <>
      {
        <div className={s.container}>
          <h1>Search {search}</h1>
          <input
            className={`${s.searchInput} ${s.icon}`}
            placeholder='Artists, songs or albums'
            onChange={handleChangeInput}
            onKeyDown={handleChangeInput}
          />
          {!search.length > 0 && (
            <div className={s.yourMostPlayed}>
              <h1>Your most played albums</h1>
              <div className={s.cards}>
                <div className={s.albumCard}>Metallica</div>
                <div className={s.albumCard}>Rammstein</div>
              </div>
            </div>
          )}

          <div className={isLoading ? 'loader' : ''}>
            {(artists.length > 0 && !isLoading) && (
              <div>
                <ArtistSlider artists={artists} header={`Artist results on "${search}"`} />
              </div>
            )}
            {(albums.length > 0 && !isLoading) && (
              <div>
                <AlbumSlider albums={albums} header={`Album results on "${search}"`} />
              </div>
            )}

            {(songs.length > 0 && !isLoading) && (
              <div>
                <SongSlider songs={songs} header={`Songs results on "${search}"`} />
              </div>
            )}

          </div>


        </div>
      }
    </>
  )
}

export default SearchPage
