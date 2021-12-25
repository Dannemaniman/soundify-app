import React, { useEffect, useState } from 'react'

const SoundifyContext = React.createContext({
  user: true,
  onLogin: () => {},
  fetchFromAPI: () => {},
})

export const SoundifyContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const loginHandler = () => {
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    setIsLoggedIn(false)
  }

  const fetchFromAPI = () => {}

  return (
    <SoundifyContext.Provider value={SoundifyContext}>
      {props.children}
    </SoundifyContext.Provider>
  )
}

export default SoundifyContext
