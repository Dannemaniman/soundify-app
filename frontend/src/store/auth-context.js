import React, { useState } from 'react'

const AuthContext = React.createContext({
  isLoggedIn: '',
  loginHandler: (username, password) => { },
  logoutHandler: () => { },
})


export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const baseUrl = 'http://localhost:8000/'

  const loginHandler = (username, password) => {
    console.log(username, password)
    fetch(`${baseUrl}api/user/login`)
      .then((data) => data.json())
      .then(data => console.log(data))
      .catch((err) => console.log(err))
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    setIsLoggedIn(false)
  }


  return <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, loginHandler: loginHandler, logoutHandler: logoutHandler }}>{props.children}</AuthContext.Provider>
}


export default AuthContext