import { Post, User } from "./models";
import {  connectToDB } from "./utils";
import {unstable_noStore as noStore} from 'next/cache'

export const getPosts = async () => {
 try {
  connectToDB();
  const posts = await Post.find();
  return posts

 } catch (err) {
  console.log(err);
  throw new Error('Failed to fetch data');
 }
}
export const getPost = async (slug) => {
 try {
  connectToDB();
  const post = await Post.findOne({slug : slug});
  return post

 } catch (err) {
  console.log(err);
  throw new Error('Failed to fetch data');
 }
}
export const getUser = async (id) => {
 noStore();
 try {
  connectToDB();
  const user = await User.findById(id);
  return user

 } catch (err) {
  console.log(err);
  throw new Error('Failed to fetch data');
 }
}
export const getUsers = async () => {
 try {
  connectToDB();
  const users = await User.find();
  return users

 } catch (err) {
  console.log(err);
  throw new Error('Failed to fetch data');
 }
}