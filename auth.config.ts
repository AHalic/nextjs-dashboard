import type { NextAuthConfig } from 'next-auth';
 
// authorized callback is used to verify if the request is 
// authorized to access a page via Next.js Middleware
// It is called before a request is completed
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  // providers option is an array where you list different login options
  providers: [], // Add providers with an empty array for now
  callbacks: {
    // auth property contains the user's session
    // request property contains the incoming request
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;