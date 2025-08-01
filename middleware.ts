import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

// The matcher is updated to protect all dashboard routes, including the root.
export const config = {
  matcher: ["/dashboard/:path*"],
};
