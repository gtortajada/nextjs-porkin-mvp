import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

const { auth: edgeAuth } = NextAuth(authConfig);

export default edgeAuth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthenticated = !!req.auth;

  if (isAuthenticated || PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", req.url));
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
