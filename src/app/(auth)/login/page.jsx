'use server';
import React from 'react'
import { BsGithub } from "react-icons/bs";
// import { auth, signIn } from '../../../../lib/auth'
import { handleGithubLogin } from '../../../../lib/actions';
import styles from './login.module.css'
// import Link from 'next/link'

import LoginForm from '@/components/loginForm/loginForm';
// import { auth } from '../../../../lib/auth';
// import { useRouter } from 'next/router';



async function LoginPage() {
  // const router = useRouter();
  // auth?.user.isAdmin && router.push('/')
  return (
    <div className={styles.container}>
      <LoginForm >
        <form className={styles.form} action={handleGithubLogin}>
          <button className={styles.button} >Log in with GitHub {<BsGithub className={styles.icon} />} </button>
        </form>
      </LoginForm >
    </div>
  );
}

export default LoginPage




