//controllers
"use server"; //will apply to any function here in this file

import { signIn, signOut } from "./auth";
import { Post, User } from "./models";
import { connectToDB } from "./utils";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export const addPost = async (prevState, formData) => {
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

    revalidatePath("/admin"); // revalidate the admin page even if we used no-store
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
export const addUser = async (prevState, formData) => {
  const { username, email, password, img } = Object.fromEntries(formData);
  try {
    connectToDB();
    const newUser = new User({
      username,
      email,
      password,
      img,
    });
    await newUser.save();

    revalidatePath("/admin"); // revalidate the admin page even if we used no-store

    console.log("new user added and saved to dB");
  } catch (err) {
    console.log(err);
  }
};
export const deleteUser = async (prevState, formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);

    console.log("User deleted successfully");
    revalidatePath("/admin"); // revalidate the blog page even if we used no-store
  } catch (err) {
    console.log(err);
  }
};
export const deletePost = async (prevState, formData) => {
  const { postId } = Object.fromEntries(formData);
  try {
    connectToDB();
    await Post.findByIdAndDelete(postId);

    console.log("post deleted successfully");
    revalidatePath("/blog"); // revalidate the blog page even if we used no-store
    revalidatePath("/admin"); // revalidate the admin page even if we used no-store
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
  //when we call a server action with the useFormState hook ,  we must pass the prevState to the action
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
    return { success: true }; // set a success property to true in the form state object.So this info will be in the state in the registerForm component
  } catch (err) {
    console.log("=================ERROR===================");
    console.log(err);
    console.log("=================ERROR===================");
    return { error: "Failed to register" };
  }
};
export const login = async (prevState, formData) => {
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
    if (err.message.includes("CredentialsSignin")) {
      return { error: "Wrong username or password" }; //now even if we typed the right credentials , nextjs will thro an error because of the nextjs redirect function that intentionally throws an error. so to prevent this we throw an error instead of the message.
    }
    // throw err;
  }
};
