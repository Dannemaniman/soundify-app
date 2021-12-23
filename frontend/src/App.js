import './App.css'
import Login from './pages/LoginPage/LoginPage'
import Home from './pages/HomePage/HomePage'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>)
}

export default App