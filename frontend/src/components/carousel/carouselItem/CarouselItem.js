import React from 'react'
import styles from './CarouselItem.module.css'

const CarouselItem = ({ imgUrl }) => {
  return (
    <figure className={styles.figure}>
      <img className={styles.img} src={imgUrl} alt='' />
    </figure>
  )
}

export default CarouselItem
