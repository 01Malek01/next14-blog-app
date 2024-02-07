'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import styles from './links.module.css'
import NavLink from './navLink/NavLink'
import Image from 'next/image'
import { handleGithubLogout } from '../../../../lib/actions'

const links = [
  {
    title: "HomePage",
    path: "/"
  },
  {
    title: "About",
    path: "/about"
  },
  {
    title: "Contact",
    path: "/contact"
  },
  {
    title: "Blog",
    path: "/blog"
  }
];

export default function Links({ session }) {
  const [open, setOpen] = useState(false);
  const isAdmin = true;
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {
          links.map((link) => {
            return (
              <NavLink key={link.title} item={link} />
            )
          })
        }
        {session?.user ? (
          <>
            {session.user?.isAdmin && (
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            )}
            <form action={handleGithubLogout}>
              {/* Add any form content here if needed */}
              <button type="submit" className={styles.logout}>
                Logout
              </button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}

      </div>
      {/* <button className={styles.menuButton} onClick={() => setOpen((prev) => !prev)}>Menu</button> */}
      <Image src='/menu.png' alt='menu' className={styles.menuButton} onClick={() => setOpen((prev) => !prev)} width={30} height={30} />
      {
        open && <div className={styles.mobilelinks}>
          {
            links.map((link) => {
              return (
                <NavLink key={link.title} item={link} />
              )
            })
          }
        </div>
      }
    </div>
  );
}
