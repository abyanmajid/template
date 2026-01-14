import type { IAppOpenAPI } from '@/lib/types'
import { Scalar } from '@scalar/hono-api-reference'
import env from '@/lib/env'
import packageJSON from '../../package.json'

export default function configureOpenAPI(app: IAppOpenAPI) {
  app.doc('/openapi', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'a3n API',
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Local server',
      },
    ],
  })

  app.get(
    '/reference',
    Scalar({
      title: 'a3n API Reference',
      theme: 'deepSpace',
      sources: [
        { url: "/api/openapi", title: "API" },
        { url: "/api/auth/open-api/generate-schema", title: "Auth" },
      ],
    }),
  )
}
