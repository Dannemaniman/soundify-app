import './App.css'
import Header from './components/header/Header'
import Login from './pages/LoginPage/LoginPage'
import Home from './pages/HomePage/HomePage'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className='App'>
      <Header />
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
