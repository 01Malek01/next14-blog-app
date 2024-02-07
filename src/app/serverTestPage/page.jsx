import React from 'react'
import { addPost, deletePost } from '../../../lib/actions'

function page() {
 return (
  <div>
   <form action={addPost}>
    <input type="text" placeholder='Title' name='title' />
    <input type="text" placeholder='desc' name='desc' />
    <input type="text" placeholder='slug' name='slug' />
    <input type="text" placeholder='userId' name='userId' />
    <button>Post</button>
   </form>

   <form action={deletePost}>
    <input type="text" placeholder='postId' name='postId' />
    <button>Delete</button>
   </form>

  </div>
 )
}

export default page
