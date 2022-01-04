import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import SoundifyContextProvider from './store/soundify-context'
import PlayerProvider from './store/playerContext'

ReactDOM.render(
  <PlayerProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PlayerProvider>,
  document.getElementById('root')
)
