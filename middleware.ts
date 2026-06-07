import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  
  // Check both secure and non-secure auth cookies
  const isAuthenticated = 
    req.cookies.has("authjs.session-token") || 
    req.cookies.has("__Secure-authjs.session-token") ||
    req.cookies.has("next-auth.session-token") ||
    req.cookies.has("__Secure-next-auth.session-token");

  // Protect private routes
  const isPrivateRoute = 
    nextUrl.pathname.startsWith('/profile') ||
    nextUrl.pathname.startsWith('/dashboard') ||
    nextUrl.pathname.startsWith('/settings') ||
    nextUrl.pathname.startsWith('/notification') ||
    nextUrl.pathname.startsWith('/application') ||
    nextUrl.pathname.startsWith('/project/create') ||
    nextUrl.pathname.startsWith('/hackathons/submit');

  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/project', nextUrl));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
