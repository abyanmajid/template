import env from '@/lib/env'
import { initApp } from '@/lib/init'
import configureOpenAPI from '@/lib/openapi'
import { tasksRouter } from '@/routes'

const app = initApp()

configureOpenAPI(app)

const _app = app.route("/", tasksRouter)

export type IApi = typeof _app

export default {
  fetch: app.fetch,
  port: env.PORT,
}
