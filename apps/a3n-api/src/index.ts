import type { PinoLogger } from 'hono-pino'
import { OpenAPIHono } from '@hono/zod-openapi'
import { notFound, onError } from 'stoker/middlewares'
import env from '@/lib/env'
import { logger } from './middlewares/logger'

interface AppBindings {
  Variables: {
    logger: PinoLogger
  }
}

const app = new OpenAPIHono<AppBindings>()

app.use(logger())

app.get('/', (c) => {
  c.var.logger.info('Hello Hono!')
  return c.text('Hello Hono!')
})

app.notFound(notFound)
app.onError(onError)

export default {
  fetch: app.fetch,
  port: env.PORT,
}
