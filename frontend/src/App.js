import './App.css'
import Login from './pages/LoginPage/LoginPage'
import Home from './pages/HomePage/HomePage'
import { Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import SoundifyContext from './store/soundify-context'

const App = () => {
  const ctx = useContext(SoundifyContext)
  console.log(ctx.user)
  
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>)
}

export default App