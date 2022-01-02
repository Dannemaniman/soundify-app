import React from 'react'
import styles from './HeroImg.module.css'

const HeroImg = ({ imgUrl, size, caption }) => {
  return (
    <figure className={styles.figure}>
      <img
        className={styles.img}
        src={imgUrl}
        alt='Hero-img'
        style={{ height: size === 'big' ? '25rem' : '' }}
      />
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  )
}

export default HeroImg
