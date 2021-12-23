import './App.css'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Login from './pages/LoginPage/LoginPage'
import Home from './pages/HomePage/HomePage'
import { Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import SoundifyContext from './store/soundify-context'

const App = () => {
  const ctx = useContext(SoundifyContext)
  console.log(ctx.user)

  return (
    <div className='App'>
      <Header />
      {true ? <Sidebar /> : ''}
      <main className='main'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
