import { initRouter } from '@/lib/init'
import * as tasksHandlers from '@/routes/tasks/tasks.handler'
import * as tasksRoutes from '@/routes/tasks/tasks.routes'

const router = initRouter()

export const tasksRouter = router
  .openapi(tasksRoutes.list, tasksHandlers.list)
  .openapi(tasksRoutes.insert, tasksHandlers.insert)
  .openapi(tasksRoutes.getById, tasksHandlers.getById)
  .openapi(tasksRoutes.updateById, tasksHandlers.updateById)
  .openapi(tasksRoutes.deleteById, tasksHandlers.deleteById)
