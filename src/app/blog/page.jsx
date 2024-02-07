import React from 'react'
import styles from './blog.module.css'
import PostCard from '@/components/postCard/PostCard'
import { getPost, getPosts } from '../../../lib/data'


const getData = async () => {
  const res = await fetch('http://localhost:3000/api/blog', { next: { revalidate: 3600 } }); // {cache: 'no-store'} prevents cache
  //we can use {next: {revalidate: 10}} means refetch every 10 seconds
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}



const BlogPage = async () => {
  // const posts = await getPosts();
  const posts = await getData();

  return (
    <div className={styles.container}>
      {posts.map((post) => {
        return (
          <div className={styles.post} key={post.id}>

            <PostCard post={post} />
          </div>
        )
      })}


    </div>
  )
}

export default BlogPage
