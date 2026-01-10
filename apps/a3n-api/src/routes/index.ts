import { initRouter } from '@/lib/init'
import * as tasksHandlers from '@/routes/tasks/tasks.handler'
import * as tasksRoutes from '@/routes/tasks/tasks.routes'

export const tasksRouter = initRouter().openapi(tasksRoutes.list, tasksHandlers.list)
