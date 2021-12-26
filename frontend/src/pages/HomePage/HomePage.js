import HeroImg from '../../components/heroImg/HeroImg'
import MostPlayed from '../../components/landingPage/MostPlayed'
import Carousel from '../../components/carousel/Carousel'
import styles from './HomePage.module.css'

const HomePage = () => {
  return (
    <>
      <div className={styles.homepage}>
        <HeroImg
          imgUrl={
            'https://img.freepik.com/free-vector/musical-notes-frame-with-text-space_1017-32857.jpg?size=626&ext=jpg'
          }
          size={'big'}
          caption={'Landing page'}
        />

        <MostPlayed />
        <Carousel />
      </div>
    </>
  )
}

export default HomePage
