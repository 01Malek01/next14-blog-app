import NextAuth from "next-auth";
import { authConfig } from "../lib/authConfig";

export default NextAuth(authConfig).auth
export const config = {
  //it's not gonna interrupt our api calls or static files
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
