import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from "react-router-dom"
import SoundifyContextProvider from "./store/soundify-context"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <SoundifyContextProvider> */}
        <App />
      {/* </SoundifyContextProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
