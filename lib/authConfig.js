export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    // when we login nextAuth creates a jwt
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; //creating an id property in our jwt
        token.isAdmin = user.isAdmin; //creating an isAdmin property in our jwt
      }
      return token;
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; //creating an id property in our session
        session.user.isAdmin = token.isAdmin; //creating an isAdmin property in our session
      }

      return session;
    },
    //using this function we can write our auth rules
     authorized({ auth, req }) {
  const user = auth?.user;
  const nextUrl = req?.nextUrl;
  const isOnAdminPanel = nextUrl?.pathname.startsWith("/admin");
  const isOnBlogPage = nextUrl?.pathname.startsWith("/blog");
  const isOnLoginPage = nextUrl?.pathname.startsWith("/login");

  // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
  if (isOnAdminPanel && !user?.isAdmin) {
    // Redirect to the home page
    return false;
  }

  // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE
  if (isOnBlogPage && !user) {
    return false;
  }

  // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE
  if (isOnLoginPage && user) {
    return Response.redirect(new URL("/", req.nextUrl));
  }

  // Allow access for other cases
  return true;
},
  },
};
