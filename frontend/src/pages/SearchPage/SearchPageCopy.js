import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

import AlbumSlider from '../../components/searchPage/AlbumSlider'
import ArtistSlider from '../../components/searchPage/ArtistSlider'
import SongList from '../../components/songlist/SongList'
import { getDataLocalStorage, populateLocalStorage } from '../../components/utils/utils'
import s from './SearchPage.module.css'


const SearchPage = () => {

  let navigate = useNavigate()
  let location = useLocation()

  let timer
  const waitTime = 700

  let [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("query"))
  const [artists, setArtist] = useState([])
  const [albums, setAlbums] = useState([])
  const [songs, setSongs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchHistory, setLatestSearchHistory] = useState([])

  const noActiveSearch = searchParams.get('query')


  useEffect(() => {
    const fetchSearch = async () => {
      console.log(searchParams.get("query"))
      if (!searchParams.get("query")) return
      setIsLoading(true)

      let response = await fetch(
        `https://yt-music-api.herokuapp.com/api/yt/search/${searchParams.get("query")}`
      )
      let res = await response.json()
      console.log(await res)

      sortFetchedData(res.content)

      if (res) setIsLoading(false)
      /* navigate(`/search/${search.toLowerCase()}`) */
    }

    const getSearchHistory = () => {
      setLatestSearchHistory(getDataLocalStorage("latestSearches"))
    }

    fetchSearch()
    getSearchHistory()
  }, [navigate, search, searchParams])


  const handleChangeInput = async (e) => {
    if (e.key === 'Enter') setSearch(e.target.value)
    clearTimeout(timer)

    //Waiting for user finished typing
    timer = setTimeout(() => {
      if (!e.target.value.length > 0) {
        resetAllSearchTerms()
        navigate(`/search/`)
        /* setSearchParams({}) */
      }
      console.log(e.target.value)
      let query = e.target.value
      setSearchParams({ query })
      addNewSearchToLoaclStorage(e.target.value)
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
    setSearch("")
  }


  const addNewSearchToLoaclStorage = (query) => {
    query = query.toLowerCase()
    let newSearches = searchHistory ? searchHistory : []
    if (query?.length <= 0) return

    const hasOldSearch = newSearches.includes(query)

    if (hasOldSearch) {
      const i = newSearches.indexOf(query)
      newSearches.splice(i, 1)
    } else if (newSearches.length >= 5) {
      newSearches.length = 4
    }

    newSearches.unshift(query)

    populateLocalStorage('latestSearches', newSearches)
    setLatestSearchHistory(newSearches)

    return newSearches
  }

  const handleGoback = () => {
    navigate('/search')
  }

  return (
    <>
      {
        <div className={s.container}>
          <div
            className={s.header}
            onClick={() => {
              handleGoback()
            }}
          >
            <img src={backIcon} alt='' />
          </div>
          <h1>Search {search ? `"${search}"` : null}</h1>
          <input
            className={`${s.searchInput} ${s.icon}`}
            placeholder={'Artists, songs or albums'}
            onChange={handleChangeInput}
          />
          {!noActiveSearch &&
            <div className={s.latestSearchesContainer}>
              <h1>Your latest searches:</h1>
              <div className={s.latestSearches}>
                {searchHistory?.length > 0 && searchHistory.map((ele, index) => {
                  return (
                    <div className={s.searchCard} key={index} onClick={(e) => { setSearchParams({ query: ele }) }}><h2>{ele}</h2></div>)
                })}
              </div>
            </div>
          }

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
