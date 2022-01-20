import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = React.createContext({
  user: {},
  setLoggedIn: () => {},
  loginHandler: async (email, password) => {},
  logoutHandler: (token) => {},
  registerHandler: async ({ email, user_name, password }) => {},
  updateUserPlaylist: () => {},
  updatePlaylistSongs: () => {},
})

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null)

  const loginHandler = async (email, password) => {
    let success = false
    await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Could not login User.')
        return res.json()
      })
      .then((user) => {
        success = validateLoginByCookie(user)
        setUser(user)
      })
      .catch((err) => console.log(err))

    return success
  }

  const registerHandler = async ({ email, user_name, password }) => {
    let success = false
    await fetch('/api/user/register', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, user_name, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Could not create new User.')
        return res.json()
      })
      .then((user) => {
        success = validateLoginByCookie(user)
        setUser(user)
      })
      .catch((err) => console.log(err))
    return success
  }

  const logoutHandler = async () => {
    await fetch('/api/user/logout', {
      method: 'POST',
    })
    setUser(null)
  }

  const validateLoginByCookie = (user) => {
    if (
      document.cookie.replace(
        /(?:(?:^|.*;\s*)loggedIn\s*\=\s*([^;]*).*$)|^.*$/,
        '$1'
      ) !== null
    ) {
      setUser(user)
      return true
    }
  }

  const setUserHandler = (data) => {
    setUser(null)
    setUser(data)
  }

  const updateUserPlaylist = (id) => {
    let newUser = user
    newUser.playlists = newUser.playlists.filter(
      (playlist) => playlist._id !== id
    )
    setUserHandler(newUser)
  }

  const updatePlaylistSongs = (playlist) => {
    let newUser = user

    for (let i = 0; i < newUser.playlists.length; i++) {
      if (newUser.playlists[i]._id === playlist._id) {
        newUser.playlists[i] = playlist
      }
    }
    setUserHandler(newUser)
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUserHandler: setUserHandler,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler,
        registerHandler: registerHandler,
        updateUserPlaylist: updateUserPlaylist,
        updatePlaylistSongs: updatePlaylistSongs,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
