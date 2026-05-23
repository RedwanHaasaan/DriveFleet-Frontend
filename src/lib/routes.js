export const PROTECTED_ROUTES = ["/add-car", "/my-cars", "/my-bookings"];

export const AUTH_ROUTES = ["/login", "/register"];

export function isProtectedRoute(pathname) {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function isAuthRoute(pathname) {
  return AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function isBookingRoute(pathname, searchParams) {
  const isCarDetail = /^\/cars\/[^/]+$/.test(pathname);
  return isCarDetail && searchParams.get("book") === "1";
}
