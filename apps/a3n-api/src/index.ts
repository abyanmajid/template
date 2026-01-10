import env from '@/lib/env'
import { initApp } from '@/lib/init'
import configureOpenAPI from '@/lib/openapi'
import { tasksRouter } from '@/routes'

const app = initApp()

const routes = [tasksRouter]

configureOpenAPI(app)

routes.forEach((route) => {
  app.route('/api', route)
})

export default {
  fetch: app.fetch,
  port: env.PORT,
}
