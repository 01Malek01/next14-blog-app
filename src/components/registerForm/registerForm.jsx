'use client'
import React, { useEffect } from 'react'
import styles from './registerForm.module.css'
import { useFormState } from 'react-dom';
import { register } from '../../../lib/actions';
import { useRouter } from 'next/navigation'; // note that it's next/navigation not next/router
import Link from 'next/link'
export default function RegisterForm() {
 const [state, FormAction] = useFormState(register, undefined);
 const router = useRouter();
 useEffect(() => {
  state?.success && router.push('/login')
 }, [state?.success, router])
 return (
  <form className={styles.form} action={FormAction}>
   <input className={styles.input} type="text" placeholder='username' name='username' />
   <input className={styles.input} type="email" placeholder='email' name='email' />
   <input className={styles.input} type="password" placeholder='password' name='password' />
   <input className={styles.input} type="password" placeholder='password again' name='passwordRepeat' />
   <button className={styles.button}>Register</button>
   {state?.error}
   <div>

    <Link href={'/login'}>Already have an account? <b className={styles.link}>Login</b> </Link>
   </div>

  </form>
 )
}
