import { IAppBindings } from '@/lib/types'
import { OpenAPIHono } from '@hono/zod-openapi'
import { pinoLogger } from 'hono-pino'
import { requestId } from 'hono/request-id'
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares'
import { defaultHook } from 'stoker/openapi'

export function initRouter() {
  return new OpenAPIHono<IAppBindings>({
    strict: false,
    defaultHook,
  })
}

export function initApp() {
  const app = initRouter()

  // Middlewares
  app.use(requestId())
  app.use(serveEmojiFavicon('❤️'))
  app.use(pinoLogger())

  // Catch all
  app.notFound(notFound)
  app.onError(onError)

  return app
}
