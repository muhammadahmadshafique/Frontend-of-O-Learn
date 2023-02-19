import React from 'react'
import styles from './Footer.module.css'
const Footer = () => {
    return (
        <>
             <div className={styles.footer}>
        <div className={styles.footerfirst}>
          <img src="/gfgLogo.png" alt="" srcset="" />
        </div>
        <div className={styles.footersecond}>
          <a href="">Teachers</a>
          <a href="">Courses</a>
          <a href="">Free Course</a>
          <a href="">Paid Courses</a>
        </div>

        <div className={styles.footerfirstthird}>
          <p>
          Stay up to date
          </p>
          <span>
          Stay Informed On How You Can Make a Difference
          </span>
        </div>

      </div>



      <div className={styles.lastone}>

        <div className={styles.lastoneone}>
        <p className={styles.lastonepara}>Copyright©uihut 2021. All rights reserved</p>
        </div>
        <div className={styles.lastoneonesecond}>
          <span className={styles.contact}>
          CONTACT
          </span>
          <a href = "mailto: muhammadahmadrcs@gmail.com">Send Email</a>
        </div>
      
      </div>
        </>
    )
}

export default Footer