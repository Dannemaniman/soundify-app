import React, { useEffect, useState } from 'react'

const SoundifyContext = React.createContext({
<<<<<<< HEAD
  fetchFromAPI: () => {}
=======
  user: true,
  onLogin: () => {},
  fetchFromAPI: () => {},
>>>>>>> dev
})

export const SoundifyContextProvider = (props) => {

  const fetchFromAPI = () => {}

  return (
    <SoundifyContext.Provider value={SoundifyContext}>
      {props.children}
    </SoundifyContext.Provider>
  )
}

export default SoundifyContext
