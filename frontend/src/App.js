import './App.css'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Login from './pages/LoginPage/LoginPage'
import Home from './pages/HomePage/HomePage'
import ArtistPage from './pages/ArtistPage/ArtistPage'
import { Route, Routes } from 'react-router-dom'
import { useContext, useState } from 'react'
import SoundifyContext from './store/soundify-context'
import { AuthContextProvider } from './store/auth-context'

const App = () => {
  const [sidebar, setsidebar] = useState(false)

  const showSidebar = () => {
    setsidebar(!sidebar)
  }

  const ctx = useContext(SoundifyContext)
  console.log(ctx.user)

  return (
<<<<<<< HEAD
    <AuthContextProvider>
      <div className='App'>
        <Header />
        <main className='main'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </main>
      </div>
    </AuthContextProvider>  
=======
    <div className='App'>
      <Header showSidebar={showSidebar} />
      <Sidebar hideSidebar={showSidebar} animation={sidebar} />
      <main className='main'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/artist/:id' element={<ArtistPage />} />
        </Routes>
      </main>
    </div>
>>>>>>> dev
  )
}

export default App
