import { env } from '@/lib/env'
import { betterFetch } from '@better-fetch/fetch'
import type { Session } from 'better-auth'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  // Fetch session from API with cookies
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        cookie: request.headers.get("cookie") || "",
      }
    }
  )

  if (!session && !request.nextUrl.pathname.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  if (session && request.nextUrl.pathname.startsWith("/sign-in")) {
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
