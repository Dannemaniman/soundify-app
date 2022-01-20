import { Route, Routes } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import './App.css'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Login from './pages/LoginPage/LoginPage'
import Home from './pages/HomePage/HomePage'
import ArtistPage from './pages/ArtistPage/ArtistPage'
import Signup from './pages/SignUpPage/SignUpPage'
import YoutubePlayer from './components/youtubePlayer/YoutubePlayer'
import SearchPage from './pages/SearchPage/SearchPage'
import PlaylistPage from './pages/PlaylistPage/PlaylistPage'
import PlaylistSongPage from './pages/PlaylistSongPage/PlaylistSongPage'
import SoundifyContext from './store/api-context'
import AuthContext from './store/auth-context'
import { PlayerContext } from './store/playerContext'
import ViewMore from './pages/viewMorePage/ViewMore'
import AlbumPage from './pages/AlbumPage/AlbumPage'
import GuardedRoute from './components/route-guard/GuardRoute'

const App = () => {
  const [sidebar, setsidebar] = useState(false)
  const player = useContext(PlayerContext)
  const auth = useContext(AuthContext)

  useEffect(() => {
    if (auth.user !== null) return
    const getUser = async () => {
      let response = await fetch('/api/user/whoami')
      let user = await response.json()

      auth.setUserHandler(user)
      auth.setLoggedIn()
      console.log(user)
    }
    getUser()
  }, [])

  const showSidebar = () => {
    setsidebar(!sidebar)
  }

  const ctx = useContext(SoundifyContext)



  return (
    <div className='App'>
      <Header showSidebar={showSidebar} />
      <Sidebar hideSidebar={showSidebar} animation={sidebar} />
      {player && <YoutubePlayer />}
      {player.overlay && (
        <div className='overlay' onClick={() => player.setOverlay(false)}></div>
      )}
      <main className='main'>
        <Routes>
          <GuardedRoute exact path='/' element={<Home />}  auth={auth.isLoggedIn} />
          <GuardedRoute path='/login' element={<Login />}  auth={auth.isLoggedIn} />
          <GuardedRoute path='/artist/:id/album/:browseId' element={<AlbumPage />}  auth={auth.isLoggedIn} />
          <GuardedRoute path='/artist/:id' element={<ArtistPage />}  auth={auth.isLoggedIn} />
          <GuardedRoute path='/search' element={<SearchPage />}  auth={auth.isLoggedIn} />
          <GuardedRoute path='/signup' element={<Signup />}  auth={auth.isLoggedIn} />
          <GuardedRoute path='/search/:query' element={<SearchPage />}  auth={auth.isLoggedIn} />
          <GuardedRoute path='/search/show-more' element={<ViewMore />}  auth={auth.isLoggedIn} />
          <GuardedRoute path='/myplaylists' element={<PlaylistPage />}  auth={auth.isLoggedIn} />
          <GuardedRoute path='/myplaylists/:id' element={<PlaylistSongPage />}  auth={auth.isLoggedIn} />
        </Routes>
      </main>
    </div>
  )
}

export default App
