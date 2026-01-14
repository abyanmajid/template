import * as HttpCode from 'stoker/http-status-codes'
import { auth } from '@/lib/auth'
import { createMiddleware } from 'hono/factory'

export const protectedRoutesMiddleware = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })

  if (!session) {
    return c.json({ message: "Unauthorized" }, HttpCode.UNAUTHORIZED)
  }

  c.set("user", session.user)
  c.set("session", session.session)
  return next()
})
