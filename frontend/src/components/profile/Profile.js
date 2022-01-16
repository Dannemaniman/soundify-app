import React, { useContext } from 'react'
import AuthContext from '../../store/auth-context'
import styles from './Profile.module.css'

const Profile = () => {
  const auth = useContext(AuthContext)

  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <i className='fas fa-user'></i>
      </div>
      <div className={styles.name}>{auth.user?.user_name}</div>
    </div>
  )
}

export default Profile
