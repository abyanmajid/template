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

export function initRouter() {
  return new OpenAPIHono<IAppBindings>({
    strict: false,
    defaultHook,
  })
}

export function initApp() {
  const app = initRouter()

  // Middlewares
  app.use(cors())
  app.use(requestId())
  app.use(serveEmojiFavicon('❤️'))
  app.use(logger())

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
