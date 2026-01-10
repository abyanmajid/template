import { IAppRouteHandler } from '@/lib/types'
import { IListRoute } from '@/routes/tasks/tasks.routes'

export const list: IAppRouteHandler<IListRoute> = (c) => {
  return c.json([
    {
      name: 'Task 1',
      done: false,
    },
  ])
}
