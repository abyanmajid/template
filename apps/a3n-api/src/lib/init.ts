import type { IAppBindings, IAppOpenAPI } from '@/lib/types'
import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { requestId } from 'hono/request-id'
import {
  notFound,
  onError,
  serveEmojiFavicon,
} from 'stoker/middlewares'
import { defaultHook } from 'stoker/openapi'
import { logger } from '@/middlewares/logger'
import { injectAuth } from '@/lib/auth'
import { getCorsOrigins } from '@/lib/cors'

export function initRouter() {
  return new OpenAPIHono<IAppBindings>({
    strict: false,
    defaultHook,
  })
}

export function initApp() {
  const app = initRouter().basePath("/api")

  app.use(requestId())
  app.use(serveEmojiFavicon('❤️'))
  app.use(logger())

  app.use(cors({
    origin: getCorsOrigins(),
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS", "DELETE", "PUT", "PATCH"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }))

  injectAuth(app)

  // Catch all
  app.notFound(notFound)
  app.onError(onError)

  return app
}

export function initTestApp(router: IAppOpenAPI) {
  const testApp = initApp()
  testApp.route('/', router)
  return testApp
}
