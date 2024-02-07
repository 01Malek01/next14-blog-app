import styles from './postUser.module.css'
import { getUser } from '../../../lib/data';
import Image from 'next/image';

// const getData = async (userId ) => {

//   const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { cache: 'no-store' }); // {cache: 'no-store'} prevents cache
//   //we can use {next: {revalidate: 10}} means refetch every 10 seconds
//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }
//   const user = await res.json();
//   return user
// }
async function PostUser({ userId }) {
  const user = await getUser(userId);


  return (
    <div className={styles.container}>
      <Image className={styles.avatar} src={user.img ? user.img : '/noavatar.png'} alt="avatar" width={50} height={50} />
<div className={styles.texts}>

      <span className={styles.title}>Author </span>
      <span className={styles.username}>{user.username}</span>
    </div>
</div>
  )
}

export default PostUser
