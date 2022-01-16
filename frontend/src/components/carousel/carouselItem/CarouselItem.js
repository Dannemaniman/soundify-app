import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './CarouselItem.module.css'

const CarouselItem = ({ imgUrl, item }) => {
  let navigate = useNavigate()

  const itemHandler = () => {
    switch (item.type) {
      case 'Album': {
        navigate(`/artist/${item.name.toLowerCase()}/album/${item.browseId}`)
        break
      }
      case 'single': {
        break
      }
      case 'EP': {
        break
      }
    }
  }

  return (
    <figure className={styles.figure} onClick={itemHandler}>
      <img className={styles.img} src={imgUrl} alt='' />
    </figure>
  )
}

export default CarouselItem
