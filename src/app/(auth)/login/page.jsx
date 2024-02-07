'use server';
import React from 'react'
import { auth, signIn } from '../../../../lib/auth'
import { handleGithubLogin, login } from '../../../../lib/actions';
import styles from './login.module.css'
import Link from 'next/link'



async function LoginPage() {
  // const session = await auth();
  // console.log('===============session=====================');
  // console.log(session);
  // console.log('====================================');
  // const handleGithubLogin = async () => {
  //   'use server'
  //   await signIn('github')
  // }
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Login</h2>
      <form className={styles.form} action={login}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="username">Username</label>
          <input
            className={styles.input}
            type="text"
            id="username"
            placeholder="Enter your username"
            name='username'
          />
        </div>
        <div className={styles.formGroup}>
          <label
            className={styles.label} htmlFor="password">Password</label>
          <input
            className={styles.input}

            type="password"
            id="password"
            placeholder="Enter your password"
            name='password'
          />
        </div>
        <button className={styles.button} type="submit">Log in</button>
      </form>
      <p className={styles.p}>OR</p>
      <form className={styles.form} action={handleGithubLogin}>
        <button className={styles.button} >Log in with GitHub</button>
      </form>
      <p className={styles.p} >Don&apos;t have an account? <Link className={styles.register} href="/register">Register</Link> </p>
    </div>
  );
}

export default LoginPage




