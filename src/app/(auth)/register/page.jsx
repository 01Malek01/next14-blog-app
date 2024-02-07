import React from 'react'
// import { register } from '../../../../lib/actions'
import styles from './register.module.css'
import RegisterForm from '@/components/registerForm/registerForm'
function Register() {
  return (
    <div className={styles.container}>
      <RegisterForm />

    </div>
  )
}

export default Register
