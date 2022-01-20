import React, { useEffect, useState } from 'react'

const ApiContext = React.createContext({
  apiService: (searchPhrase, query, body = null, method = 'GET') => Promise,
})

export const ApiContextProvider = (props) => {


  const apiServiceSearch = async (searchPhrase, query, body = null, method = 'GET') => {
    try {
      const res = await fetch(`/api/search/${searchPhrase}?${query}`, {
        method: method,
        headers: { 'Content-type': 'application/json' },
        body: body ? JSON.stringify(body) : null
      })

      return await res.json()

    } catch (error) {
      console.log(error?.message)
    }
  }


  return (
    <ApiContext.Provider value={{
      apiService: apiServiceSearch
    }}>
      {props.children}
    </ApiContext.Provider>
  )
}

export default ApiContext
