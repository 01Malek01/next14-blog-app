'use client' ;
import { usePathname } from 'next/navigation'
import styles from './nav.module.css'
import Link from 'next/link'

const NavLink = ({ item }) => {
 const pathName =usePathname();
 return (
   <Link href={item.path} className={`${styles.container} ${pathName === item.path && styles.active}`}>{item.title}</Link>

 )
}

export default NavLink