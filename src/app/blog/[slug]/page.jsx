import React, { Suspense } from 'react'
import styles from './singlePost.module.css'
import Image from 'next/image'
import PostUser from '@/components/postUsers/postUser';
// import { getPost } from '../../../../lib/data';


const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`, { cache: 'force-cache' }); // {cache: 'no-store'} prevents cache
  //we can use {next: {revalidate: 10}} means refetch every 10 seconds
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const post = await res.json();
  return post
}


export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  const post = await getData(slug);
  return {
    title: post.title,
    description: post.desc
  };
}
export default async function SingleBlogPage({ params }) {
  const { slug } = params;
  const post = await getData(slug);
  // const post = await getPost(slug);
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image className={styles.img} src={post.img} alt="post" fill />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <Suspense fallback={<div>Loading...</div>}>
            <PostUser userId={post.userId} />
          </Suspense>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>{parseInt(post.createdAt) || '2022-11-12'}</span>
          </div>
        </div>
        <div className={styles.content}>
          <p>{post.desc}</p>
        </div>
      </div>

    </div>
  )
}
