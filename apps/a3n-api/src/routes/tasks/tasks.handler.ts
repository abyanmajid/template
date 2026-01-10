import type { IAppRouteHandler } from '@/lib/types'
import type { IInsertRoute, IListRoute } from '@/routes/tasks/tasks.routes'
import { TaskEntity } from '@workspace/database/schema/task.entity'
import * as HttpCode from 'stoker/http-status-codes'
import db from '@/lib/db'

export const list: IAppRouteHandler<IListRoute> = async (c) => {
  const tasks = await db.select()
    .from(TaskEntity)
  return c.json(tasks, HttpCode.OK)
}

export const insert: IAppRouteHandler<IInsertRoute> = async (c) => {
  const body = c.req.valid('json')
  const [newTask] = await db.insert(TaskEntity)
    .values(body)
    .returning()
  return c.json(newTask, HttpCode.CREATED)
}
