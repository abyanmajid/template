import { createEnv } from '@t3-oss/env-nextjs'
import z from 'zod'

export const env = createEnv({
  server: {
    INTERNAL_API_BASE_URL: z.url(),
  },
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.url(),
  },


  runtimeEnv: {
    // eslint-disable-next-line no-restricted-globals -- process.env is needed for validation
    INTERNAL_API_BASE_URL: process.env.INTERNAL_API_BASE_URL,
    // eslint-disable-next-line no-restricted-globals -- process.env is needed for validation
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
})
