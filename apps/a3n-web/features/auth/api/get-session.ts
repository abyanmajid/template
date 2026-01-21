'use server'

import { env } from '@/lib/env'
import { betterFetch } from '@better-fetch/fetch'
import type { Session } from 'better-auth'
import { cookies } from 'next/headers'

/**
 * Fetches the current user session from the API using server-side cookies.
 * This function should only be used in Server Components or Server Actions.
 *
 * @returns The user session or null if not authenticated
 */
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')

  const { data: session } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        cookie: cookieHeader,
      },
    }
  )

  return session ?? null
}
