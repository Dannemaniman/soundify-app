import './App.css'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Login from './pages/LoginPage/LoginPage'
import Home from './pages/HomePage/HomePage'
import ArtistPage from './pages/ArtistPage/ArtistPage'
import Signup from './pages/SignUpPage/SignUpPage'
import YoutubePlayer from './components/youtubePlayer/YoutubePlayer'
import SearchPage from './pages/SearchPage/SearchPage'
import { Route, Routes } from 'react-router-dom'
import { useContext, useState } from 'react'
import SoundifyContext from './store/soundify-context'
import { AuthContextProvider } from './store/auth-context'
import { PlayerContext } from './store/playerContext'

const App = () => {
  const [sidebar, setsidebar] = useState(false)
  const player = useContext(PlayerContext)

  const showSidebar = () => {
    setsidebar(!sidebar)
  }

  const ctx = useContext(SoundifyContext)

  return (
    <div className='App'>
      <Header showSidebar={showSidebar} />
      <Sidebar hideSidebar={showSidebar} animation={sidebar} />
      {player && <YoutubePlayer />}
      <main className='main'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/artist/:id' element={<ArtistPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
