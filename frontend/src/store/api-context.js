import React, { useEffect, useState } from 'react'

const ApiContext = React.createContext({
  apiServiceGet: () => Promise,
  apiServicePost: () => Promise,
})

export const ApiContextProvider = (props) => {

  const apiServiceGet = async (url) => {
    return fetch(`/api/${url}`, { method: 'GET' })
      .then(res => {
        if (!res.ok) throw new Error('Request failed..')
        res.json()
      })
  }

  const apiServicePost = async (searchPhrase, query, body) => {
    const res = await fetch(`/api/${searchPhrase}?${query}`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (!res.ok)
      throw new Error('Request failed..')
    return await res.json()
  }

  return (
    <ApiContext.Provider value={{
      apiServiceGet: apiServiceGet,
      apiServicePost: apiServicePost
    }}>
      {props.children}
    </ApiContext.Provider>
  )
}

export default ApiContext
