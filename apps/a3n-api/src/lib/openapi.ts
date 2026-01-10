import type { IAppOpenAPI } from '@/lib/types'
import { Scalar } from '@scalar/hono-api-reference'
import packageJSON from '../../package.json'

export default function configureOpenAPI(app: IAppOpenAPI) {
  app.doc('/openapi', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'a3n API',
    },
  })

  app.get(
    '/reference',
    Scalar({
      title: 'a3n API Reference',
      url: '/openapi',
      theme: 'deepSpace',
    }),
  )
}
