import React, { useContext, useState } from 'react'
import Header from '../components/header/Header'
import Sidebar from '../components/sidebar/Sidebar'
import YoutubePlayer from '../components/youtubePlayer/YoutubePlayer'
import { PlayerContext } from '../store/playerContext'

const Layout = (props) => {
  const [sidebar, setsidebar] = useState(false)
  const player = useContext(PlayerContext)

  const showSidebar = () => {
    setsidebar(!sidebar)
  }

  return (
    <div className='layout'>
      <Header showSidebar={showSidebar} />
      <Sidebar hideSidebar={showSidebar} animation={sidebar} />
      {player && <YoutubePlayer />}
      {player.overlay && (
        <div className='overlay' onClick={() => player.setOverlay(false)}></div>
      )}
      <main className='main'>{props.children}</main>
    </div>
  )
}

export default Layout
