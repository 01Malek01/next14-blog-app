//controllers
"use server"; //will apply to any function here in this file

import { signIn, signOut } from "./auth";
import { Post, User } from "./models";
import { connectToDB } from "./utils";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export const addPost = async (formData) => {
  const { title, desc, slug, userId } = Object.fromEntries(formData);
  try {
    connectToDB();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });
    await newPost.save();

    revalidatePath("/blog"); // revalidate the blog page even if we used no-store

    // const newPost = await Post.create({
    //   title,
    //   desc,
    //   slug,
    //   userId,
    // })
    console.log("new post added and saved to dB");
  } catch (err) {
    console.log(err);
  }
};
export const deletePost = async (formData) => {
  const { postId } = Object.fromEntries(formData);
  try {
    connectToDB();
    await Post.findByIdAndDelete(postId);

    console.log("post deleted successfully");
    revalidatePath("/blog"); // revalidate the blog page even if we used no-store
  } catch (err) {
    console.log(err);
  }
};
export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};
export const handleGithubLogout = async () => {
  await signOut();
};

export const register = async (previousState, formData) => {
  // form data comes from the form that uses this action
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);
  if (password !== passwordRepeat) {
    return new Error("passwords don't match");
  }

  try {
    connectToDB();
    const user = await User.findOne({ username });
    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(String(password), salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });
    await newUser.save();
    console.log("new user added and saved to dB");
    return { success: true };
  } catch (err) {
    console.log("=================ERROR===================");
    console.log(err);
    console.log("=================ERROR===================");
    return { error: "Failed to register" };
  }
};
export const login = async (formData) => {
  // form data comes from the form that uses this action
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", {
      //use credentials provider when creating a custom login or sign in with user credentials
      username,
      password,
    });
  } catch (err) {
    console.log("=================ERROR===================");
    console.log(err);
    console.log("=================ERROR===================");
    return {error:'failed to login'}
  }
};
