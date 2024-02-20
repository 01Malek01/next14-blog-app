import React from 'react';
import styles from './adminPosts.module.css';
import { getPosts } from '../../../lib/data';
import Image from 'next/image';
import { deletePost } from '../../../lib/actions';
async function AdminPosts() {
  const posts = await getPosts();
 
  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {
        posts.map(post => {
          return (
            <>
              <div key={post.id} className={styles.post}>{post}
                <div className={styles.detail}>
                  <Image src={post.img || "/noAvatar.png"} alt='img of the post' width={50} height={50} />
                  <div className={styles.postTitle} >

                    {post.title}
                  </div>
                </div>
                <form action={deletePost}>
                  <input type='hidden' name='id' value={post.id} />
                  <button className={styles.postButton}>Delete</button>
                </form>
              </div>
            </>
          )
        })
      }

    </div>
  )
}

export default AdminPosts
