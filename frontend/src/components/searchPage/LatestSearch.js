import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getDataLocalStorage } from '../../components/utils/utils'
import s from './LatestSearch.module.css'


const LatestSearch = () => {

  const [, setSearchParams] = useSearchParams()
  const [searchHistory, setLatestSearchHistory] = useState([])

  useEffect(() => {

    const getSearchHistory = () => {
      setLatestSearchHistory(getDataLocalStorage("latestSearches"))
    }

    getSearchHistory()

  }, [])

  return (
    <div className={s.latestSearchesContainer}>
      <h1>Your latest searches:</h1>
      <div className={s.latestSearches}>
        {searchHistory?.length > 0 && searchHistory.map((ele, index) => {
          return (
            <div className={s.searchCard} key={index} onClick={(e) => { setSearchParams({ query: ele }) }}><h2>{ele}</h2></div>)
        })}
      </div>
    </div>
  )
}

export default LatestSearch