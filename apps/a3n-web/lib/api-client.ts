import { env } from '@/lib/env'
import type { IApi } from 'a3n-api'
import { hc } from 'hono/client'

const client = hc<IApi>(env.NEXT_PUBLIC_API_BASE_URL, {
  init: {
    credentials: 'include',
  }
})



export const apiClient = client.api
