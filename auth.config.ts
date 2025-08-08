
// import type { NextAuthConfig } from "next-auth";

// export const authConfig = {
//   pages: {
//     signIn: "/dashboard/login",
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         // If the user is logged in and tries to access the login page, redirect them to the dashboard
//         if (nextUrl.pathname === "/dashboard/login") {
//             return Response.redirect(new URL("/dashboard", nextUrl));
//         }
//         return true;
//       }
//       return true;
//     },
//   },
//   providers: [],
// } satisfies NextAuthConfig;
