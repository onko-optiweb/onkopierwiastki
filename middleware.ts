import NextAuth from "next-auth";
import { authConfig } from "@/src/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
