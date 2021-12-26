import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './Carousel.module.css'
import styless from '../landingPage/MostPlayed.module.css'

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    adaptiveHeight: true,
    useCSS: true,
    useTransform: true,
  }

  return (
    <div className={styles.carousel}>
      <Slider {...settings}>
        <figure className={styless.figure} style={{ marginLeft: '5px' }}>
          <img
            className={styless.img}
            src='https://www.gofinland.org/wp-content/uploads/2019/08/music-in-finland.jpg'
            alt=''
          />
          <div className={styless.play}>
            <i className='fas fa-play'></i>
          </div>
        </figure>
        <figure className={styless.figure}>
          <img
            className={styless.img}
            src='https://www.gofinland.org/wp-content/uploads/2019/08/music-in-finland.jpg'
            alt=''
          />
          <div className={styless.play}>
            <i className='fas fa-play'></i>
          </div>
        </figure>
        <figure className={styless.figure}>
          <img
            className={styless.img}
            src='https://www.gofinland.org/wp-content/uploads/2019/08/music-in-finland.jpg'
            alt=''
          />
          <div className={styless.play}>
            <i className='fas fa-play'></i>
          </div>
        </figure>
        <figure className={styless.figure}>
          <img
            className={styless.img}
            src='https://www.gofinland.org/wp-content/uploads/2019/08/music-in-finland.jpg'
            alt=''
          />
          <div className={styless.play}>
            <i className='fas fa-play'></i>
          </div>
        </figure>
        <figure className={styless.figure}>
          <img
            className={styless.img}
            src='https://www.gofinland.org/wp-content/uploads/2019/08/music-in-finland.jpg'
            alt=''
          />
          <div className={styless.play}>
            <i className='fas fa-play'></i>
          </div>
        </figure>
        <figure className={styless.figure}>
          <img
            className={styless.img}
            src='https://www.gofinland.org/wp-content/uploads/2019/08/music-in-finland.jpg'
            alt=''
          />
          <div className={styless.play}>
            <i className='fas fa-play'></i>
          </div>
        </figure>
        <figure className={styless.figure}>
          <img
            className={styless.img}
            src='https://www.gofinland.org/wp-content/uploads/2019/08/music-in-finland.jpg'
            alt=''
          />
          <div className={styless.play}>
            <i className='fas fa-play'></i>
          </div>
        </figure>
      </Slider>
    </div>
  )
}

export default Carousel
