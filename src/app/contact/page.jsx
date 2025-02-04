import React from 'react'
import styles from './contact.module.css'
import Image from 'next/image'

export const metadata = {
  title: " Contact Page",
  description: "Contact details for the blog app",
};
function ContactPage() {

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="/contact.png"
          alt="contact"
          width={500}
          height={500}
          className={styles.img}

        />
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <input type="text" placeholder='Name and Surname' />
          <input type="text" placeholder='Email Address' />
          <input type="text" placeholder='Phone Number (Optional)' />
          <textarea name="" id="" cols="30" rows="10" placeholder='Message'></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  )
}

export default ContactPage
