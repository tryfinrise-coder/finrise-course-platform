import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

// Single-domain, path-based routing with auth gating (no subdomains).
//
//  • Public (no login):   /  (marketing landing), /pages/*  (sales pages),
//                         /login, /thank-you
//  • Student app (login): /dashboard, /courses, /library, /achievements,
//                         /leaderboard, /download
//  • Admin panel (admin): /admin/*
//
// The course content and admin panel are never linked from the public site —
// they're reachable only by typing the path with a valid session, so the main
// domain stays a pure sales/marketing surface.

const PROTECTED = [
  "/dashboard",
  "/library",
  "/courses",
  "/admin",
  "/download",
  "/achievements",
  "/leaderboard",
];

// Always reachable without a session (prevents login redirect loops).
const PUBLIC = new Set(["/login", "/courses/login"]);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC.has(pathname)) return NextResponse.next();

  const needsAuth = PROTECTED.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (!needsAuth) return NextResponse.next(); // /, /pages/*, /thank-you, etc.

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) return redirectToLogin(req, pathname);

  // admin area requires the admin role; everyone else goes to their dashboard
  if (pathname.startsWith("/admin") && session.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

function redirectToLogin(req: NextRequest, next: string) {
  const url = req.nextUrl.clone();
  // Admin area → admin login; student/course area → the /courses/login URL.
  url.pathname = next.startsWith("/admin") ? "/login" : "/courses/login";
  url.search = `?next=${encodeURIComponent(next)}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except Next internals, static files, and API routes.
  matcher: ["/((?!_next/|api/|.*\\.).*)"],
};
