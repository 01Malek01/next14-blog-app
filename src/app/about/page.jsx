import React from 'react'
import styles from './about.module.css'
import Image from 'next/image'

export const metadata = {
  title: " About Page",
  description: "About details for the blog app",
};
function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Agency </h2>
        <h1 className={styles.title}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
        <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora blanditiis totam provident dolorem rem ad eos esse, explicabo odio enim.</p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Years of Experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Years of Experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Years of Experience</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>

        <Image className={styles.img} src="/about.png" alt="about" fill />
      </div>
    </div>
  )
}

export default AboutPage
