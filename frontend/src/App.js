import './App.css'
import Header from './components/header/Header'
import Login from './pages/LoginPage/LoginPage'
import Home from './pages/HomePage/HomePage'
import { Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import SoundifyContext from './store/soundify-context'
import { AuthContextProvider } from './store/auth-context'

const App = () => {
  const ctx = useContext(SoundifyContext)
  console.log(ctx.user)
  
  return (
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
  )
}

export default App
