import type { auth } from '@/lib/auth'
import type {
  OpenAPIHono,
  RouteConfig,
  RouteHandler,
} from '@hono/zod-openapi'
import type { PinoLogger } from 'hono-pino'

export interface IAppBindings {
  Variables: {
    logger: PinoLogger
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}

export type IAppOpenAPI = OpenAPIHono<IAppBindings>

export type IAppRouteHandler<R extends RouteConfig> = RouteHandler<R, IAppBindings>
