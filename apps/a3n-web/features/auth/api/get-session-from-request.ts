'use server'

import { env } from '@/lib/env'
import { betterFetch } from '@better-fetch/fetch'
import type { Session } from 'better-auth'
import type { NextRequest } from 'next/server'

/**
 * Fetches the current user session from the API using cookies from a NextRequest.
 * This function should only be used in middleware.
 *
 * @param request - The Next.js request object
 * @returns The user session or null if not authenticated
 */
export async function getSessionFromRequest(
  request: NextRequest
): Promise<Session | null> {
  const { data: session } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    }
  )

  return session ?? null
}
