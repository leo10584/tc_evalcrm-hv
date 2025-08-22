import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath =
    path.startsWith("/auth/") ||
    path.startsWith("/api/auth/") ||
    path.startsWith("/_next/") ||
    path.startsWith("/favicon.ico") ||
    path === "/unauthorized"

  // If it's a public path, allow the request to continue
  if (isPublicPath) {
    return NextResponse.next()
  }

  // Get the token from the request
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  console.log("[v0] Middleware check for path:", path, "Token exists:", !!token)

  // If no token and trying to access protected route, redirect to signin
  if (!token) {
    const signInUrl = new URL("/auth/signin", request.url)
    signInUrl.searchParams.set("callbackUrl", request.url)
    return NextResponse.redirect(signInUrl)
  }

  // If authenticated, allow the request to continue
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/ (authentication pages)
     * - unauthorized (unauthorized page)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|auth|unauthorized).*)",
  ],
}
