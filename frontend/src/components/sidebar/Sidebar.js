import React from 'react'
import styles from './Sidebar.module.css'

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.profilePic}></div>
        <div>
          <h3>Robin Johansson</h3>
          <h4>Pro user</h4>
        </div>
      </div>

      <div className={styles.listContainer}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            {' '}
            <i className={`fas fa-home ${styles.symbol}`}></i>
            HOME
          </li>
          <li className={styles.listItem}>
            <i className={`fas fa-list-ul ${styles.symbol}`}></i>
            PLAYLIST
          </li>
          <li className={styles.listItem}>
            <i className={`fas fa-search ${styles.symbol}`}></i>
            SEARCH
          </li>
          <li className={styles.listItem}>
            <i className={`fas fa-sign-out-alt ${styles.symbol}`}></i>
            LOGOUT
          </li>
        </ul>
      </div>

      <div className={styles.socialBar}>
        <div className={styles.profilePic}>
          <i className='fab fa-facebook-f'></i>
        </div>
        <div className={styles.profilePic}>
          <i className='fab fa-instagram'></i>
        </div>
        <div className={styles.profilePic}>
          <i className='fab fa-twitter'></i>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
