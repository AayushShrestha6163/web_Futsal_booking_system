import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/register", "/forget-password", "/reset-password"];
const adminRoutes = ["/admin"];
const userRoutes = ["/dashboard"]; // ✅ fixed

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("auth_token")?.value || null;
  const userDataRaw = request.cookies.get("user_data")?.value || null;

  let user: any = null;
  try {
    user = userDataRaw ? JSON.parse(userDataRaw) : null;
  } catch {
    user = null;
  }

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isUserRoute = userRoutes.some((route) => pathname.startsWith(route));

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && !user && !isPublicRoute) {
    const res = NextResponse.redirect(new URL("/login", request.url));
    res.cookies.set("auth_token", "", { path: "/", maxAge: 0 });
    res.cookies.set("user_data", "", { path: "/", maxAge: 0 });
    return res;
  }

  if (token && user) {
    const role = String(user.role || "").toLowerCase();

    if (isAdminRoute && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (isUserRoute && role === "admin") {
      // admin should not be on user dashboard (matches your dashboard/layout.tsx)
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  if (isPublicRoute && token) {
    const role = String(user?.role || "").toLowerCase();
    return NextResponse.redirect(new URL(role === "admin" ? "/admin" : "/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/login",
    "/register",
    "/forget-password",
    "/reset-password",
  ],
};