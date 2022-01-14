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
import SoundifyContext from './store/soundify-context'
import AuthContext from './store/auth-context'
import { PlayerContext } from './store/playerContext'
import ViewMore from './pages/viewMorePage/ViewMore'
import AlbumPage from './pages/AlbumPage/AlbumPage'

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
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/artist/:id/album/:browseId' element={<AlbumPage />} />
          <Route path='/artist/:id' element={<ArtistPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/search/:query' element={<SearchPage />} />
          <Route path='/search/show-more' element={<ViewMore />} />
          <Route path='/myplaylists' element={<PlaylistPage />} />
          <Route path='/playlist' element={<PlaylistSongPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
