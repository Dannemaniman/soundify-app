import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = React.createContext({
  isLoggedIn: '',
  user: {},
  setLoggedIn: () => {},
  setUserHandler: (user) => {},
  loginHandler: async (email, password) => {},
  logoutHandler: (token) => {},
  registerHandler: async ({ email, user_name, password }) => {},
})

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
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

  const validateLoginByCookie = (user) => {
    if (
      document.cookie.replace(
        /(?:(?:^|.*;\s*)loggedIn\s*\=\s*([^;]*).*$)|^.*$/,
        '$1'
      ) !== null
    ) {
      setUser(user)
      setIsLoggedIn(true)
      return true
    }
  }

  const logoutHandler = async () => {
    await fetch('/api/user/logout', {
      method: 'POST',
    })
    setIsLoggedIn(false)
  }

  const setUserHandler = (data) => {
    setUser(data.user)
  }

  const setLoggedIn = () => {
    setIsLoggedIn(true)
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user: user,
        setUserHandler: setUserHandler,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler,
        registerHandler: registerHandler,
        setLoggedIn: setLoggedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
