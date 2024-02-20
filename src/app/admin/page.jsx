import React, { Suspense } from 'react';
import styles from './admin.module.css';
import adminPostForm from '@/components/adminPostForm/adminPostForm';
import AdminPosts from '@/components/adminPosts/adminPosts';
import adminUsers from '@/components/adminUsers/adminUsers';
import adminUserForm from '@/components/adminUserForm/adminUserForm';
function AdminPage() {
  return (
    
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPosts />
          </Suspense>
        </div>
        <div className={styles.col}>
          <adminPostForm />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <adminUsers />
          </Suspense>
        </div>
        <div className={styles.col}>
          <adminUserForm />
        </div>
      </div>

    </div>
  )
}

export default AdminPage
