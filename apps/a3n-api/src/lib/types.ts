import { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi'
import { PinoLogger } from 'hono-pino'

export type IAppBindings = {
  Variables: {
    logger: PinoLogger
  }
}

export type IAppOpenAPI = OpenAPIHono<IAppBindings>

export type IAppRouteHandler<R extends RouteConfig> = RouteHandler<R, IAppBindings>
