import React from 'react'
import styles from './navbar.module.css'
import Links from './links/Links'
import Link from 'next/link'
import { auth } from '../../../lib/auth';

async function Navbar() {
  const session = await auth();

  return (
    <div className={styles.container}>
      <Link href={"/"} className={styles.logo}>Logo</Link>
      <div><Links session={session} /></div>
    </div>
  )
}

export default Navbar
