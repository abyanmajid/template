import { getCorsOrigins } from '@/lib/cors'
import db from '@/lib/db'
import env from '@/lib/env'
import type { IAppOpenAPI } from '@/lib/types'
import { protectedRoutesMiddleware } from '@/middlewares/protected-routes'
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { openAPI } from "better-auth/plugins"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    }
  },
  plugins: [
    openAPI()
  ],
  rateLimit: {
    window: 60,
    max: 10,
  },
  trustedOrigins: getCorsOrigins(),
})

export type IAuthSession = typeof auth.$Infer.Session

export function injectAuth(app: IAppOpenAPI) {
  app.on(["POST", "GET"], "/auth/*", (c) => {
    return auth.handler(c.req.raw)
  })

  app.get("/session", (c) => {
    const session = c.get("session")
    const user = c.get("user")

    if (!user) return c.body(null, 401)

    return c.json({
      session,
      user
    })
  })

  app.use("*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers })

    if (!session) {
      c.set("user", null)
      c.set("session", null)
      await next()
      return
    }

    c.set("user", session.user)
    c.set("session", session.session)
    await next()
  })

  if (!env.DISABLE_AUTH_GUARD) {
    app.use("*", async (c, next) => {
      const path = new URL(c.req.url).pathname
      if (path.startsWith("/api/auth/")) {
        await next()
        return
      }
      return protectedRoutesMiddleware(c, next)
    })
  }
}
