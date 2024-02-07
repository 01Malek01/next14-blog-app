import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "./utils";
import { User } from "./models";
import bcrypt from "bcrypt";
//we had to create a github Oauth application first and get the credentials
const login = async (credentials) => {
  try {
    connectToDB();
    const user = await User.findOne({
      username: credentials.username,
    });
    if (!user) {
      console.log("No user found");
    }
    const isValid = await bcrypt.compare(credentials.password, user.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }
    return user;
  } catch (err) {
    console.log(err);
  }
};
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    //here we can store users in the database using the authjs methods
    async signIn({ user, account, profile }) {
      if (account.provider === "github") {
        connectToDB();
        try {
          const user = await User.findOne({ email: profile.email });
          if (!user) {
            await User.create({
              username: profile.login,
              email: profile.email,
              img: profile.avatar_url,
            });
          }
        } catch (err) {
          console.log("===============error=====================");
          console.log(err);
          console.log("====================================");
          return false; // even if the user signed in but the user doesn't exist in our DB ,  the user won't be authenticated
        }
      }
      return true;
    },
  },
});
