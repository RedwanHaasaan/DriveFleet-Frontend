import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import {
  isProtectedRoute,
  isAuthRoute,
  isBookingRoute,
} from "@/lib/routes";

export function proxy(request) {
  const { pathname, searchParams } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);
  const isLoggedIn = Boolean(sessionCookie);

  if (isProtectedRoute(pathname) && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isBookingRoute(pathname, searchParams) && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", `${pathname}?book=1`);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute(pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-car",
    "/my-cars",
    "/my-bookings",
    "/login",
    "/register",
    "/cars/:path*",
  ],
};
