import { getSessionFromRequest } from '@/features/auth/api'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const AUTH_ROUTES = ["/sign-in", "/sign-up", "/forgot-password"]

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(route => pathname.startsWith(route))
}

export async function proxy(request: NextRequest) {
  const session = await getSessionFromRequest(request)
  const pathname = request.nextUrl.pathname

  // Redirect unauthenticated users to sign-in (except if they're already on an auth page)
  if (!session && !isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  // Redirect authenticated users away from auth pages
  if (session && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
