import React, { useEffect, useState } from 'react'
import { useNavigate, } from 'react-router-dom'

import AlbumSlider from '../../components/searchPage/AlbumSlider'
import ArtistSlider from '../../components/searchPage/ArtistSlider'
import SongList from '../../components/songlist/SongList'
import { getDataLocalStorage, populateLocalStorage } from '../../components/utils/utils'
import s from './SearchPage.module.css'

const SearchPage = () => {

  let navigate = useNavigate()

  let timer
  const waitTime = 1200

  const [search, setSearch] = useState('')
  const [artists, setArtist] = useState([])
  const [albums, setAlbums] = useState([])
  const [songs, setSongs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchHistory, setLatestSearchHistory] = useState([])

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
      navigate(`/search/${search.toLowerCase()}`)
    }

    const getSearchHistory = () => {
      setLatestSearchHistory(getDataLocalStorage("latestSearches"))
    }

    fetchSearch()
    getSearchHistory()
  }, [navigate, search])


  const handleChangeInput = async (e) => {
    if (e.key === 'Enter') setSearch(e.target.value)
    clearTimeout(timer)

    //Waiting for user finished typing
    timer = setTimeout(() => {
      if (!e.target.value.length > 0) {
        resetAllSearchTerms()
        navigate(`/search/`)
      }
      setSearch(e.target.value)
      createNewSearch(e.target.value)
    }, waitTime)
  }


  const sortFetchedData = (data) => {
    let newSongs = []
    let newArtists = []
    let newAlbums = []

    data.forEach((element) => {
      if (element.type === 'song' || element.type === 'video') {
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


  const createNewSearch = (query) => {
    let newSearches = searchHistory ? searchHistory : []
    if (query?.length <= 0) return

    newSearches = newSearches.filter((ele) => {
      return ele !== query
    })

    newSearches.push(query.toLowerCase())

    if (newSearches.length > 5) {
      newSearches = newSearches.slice(1)
      console.log(newSearches.slice(1))
    }

    populateLocalStorage('latestSearches', newSearches.reverse())
    setLatestSearchHistory(newSearches.reverse())
    return newSearches
  }



  return (
    <>
      {
        <div className={s.container}>
          <h1>Search {search ? `"${search}"` : null}</h1>
          <input
            className={`${s.searchInput} ${s.icon}`}
            placeholder={search ? search : 'Artists, songs or albums'}
            onChange={handleChangeInput}
            onKeyDown={handleChangeInput}
          />
          {(
            <div className={s.latestSearchesContainer}>
              {
                console.log()
              }
              <h1>Your latest searches:</h1>
              <div className={s.latestSearches}>
                {searchHistory?.length > 0 && searchHistory.map((ele, index) => {
                  return (
                    <div className={s.searchCard} key={index} onClick={(e) => { setSearch(ele) }}><h2>{ele}</h2></div>)
                })}
              </div>
            </div>
          )}

          <div className={isLoading ? 'loader' : ''}>
            {artists.length > 0 && !isLoading && (
              <div>
                <ArtistSlider
                  artists={artists}
                  header={`Artist results on "${search}"`}
                />
              </div>
            )}
            {albums.length > 0 && !isLoading && (
              <div>
                <AlbumSlider
                  albums={albums}
                  header={`Album results on "${search}"`}
                />
              </div>
            )}

            {songs.length > 0 && !isLoading && artists && (
              <div>
                <SongList
                  songs={songs.slice(0, 5)}
                  header={`Songs results on "${search}"`}
                  artist={search}
                />
              </div>
            )}

          </div>
        </div>
      }
    </>
  )
}

export default SearchPage
