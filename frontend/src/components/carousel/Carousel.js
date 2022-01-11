import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './Carousel.module.css'
import './Carousel.css'
import CarouselItem from './carouselItem/CarouselItem'

const Carousel = ({ title, list }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    swipeToSlide: true,
    arrows: false,
  }

  const dummyData = [
    {
      imgUrl:
        'https://illuminechicago.com/wp-content/uploads/2016/10/MC-YOGI-4.jpg',
    },
    {
      imgUrl:
        'https://ar.toneden.io/8765664/c187238f-2ae2-4588-8cc3-a7e42ebb8696',
    },
    {
      imgUrl:
        'https://1.bp.blogspot.com/-j4NrW9VfbCY/X75mu58apxI/AAAAAAABMJg/uOouSIfwEoYMk46STt3l14pJrJmn0imTgCLcBGAsYHQ/w1200-h630-p-k-no-nu/music-artist-band-profile-Jackie%2527s%2BBoy-R%2526B-Georgia-USA-srl-networks-london-music-pr-roster.jpg',
    },
    {
      imgUrl:
        'https://www.mackavenue.com/images/uploads/14821/art7076_kirk_whalum_hdcs_cover_3000x3000_rgb__cat_img.jpg',
    },
    {
      imgUrl:
        'https://oksessions.com/wp-content/uploads/2018/08/johnnymanchild-1-750x375.jpg',
    },
    {
      imgUrl:
        'https://i.pinimg.com/originals/1a/d3/c2/1ad3c2a19949c82d656ce98cbef7a7ef.jpg',
    },
    {
      imgUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEUfVa8Q3kvDqZK10pX8653m_iGH80FEDMSIgQCZWrLfqzZTc2IY8wa9lkZso9GSdQ1Qk&usqp=CAU',
    },
    {
      imgUrl:
        'https://images.ctfassets.net/p0qf7j048i0q/E376CA124AAD4AB9BC0ACBB0112A1047/2cc358fdb015728fc7c9475ab8807d64/12_AP653377295295_Solange.jpg?w=1000&h=750&fit=fill&fm=webp',
    },
  ]

  const Real = () => {
    return (
      <Slider {...settings} className={styles.carousel}>
        {list && list.map((item, index) => (
          <CarouselItem key={index} imgUrl={item.thumbnails[1].url} />
        ))}
      </Slider>
    )
  }

  const Fake = () => {
    return (
      <Slider {...settings} className={styles.carousel}>
        {dummyData.map((item, index) => (
          <CarouselItem key={index} imgUrl={item.imgUrl} />
        ))}
      </Slider>
    )
  }

  return (
    <div className={styles.carousel}>
      <h1 style={{ color: 'black' }}>{title}</h1>
      {list ? <Real /> : <Fake />}
    </div>
  )
}

export default Carousel
