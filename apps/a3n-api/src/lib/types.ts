import type {
  OpenAPIHono,
  RouteConfig,
  RouteHandler,
} from '@hono/zod-openapi'
import type { PinoLogger } from 'hono-pino'

export interface IAppBindings {
  Variables: {
    logger: PinoLogger
  }
}

export type IAppOpenAPI = OpenAPIHono<IAppBindings>

export type IAppRouteHandler<R extends RouteConfig> = RouteHandler<R, IAppBindings>
