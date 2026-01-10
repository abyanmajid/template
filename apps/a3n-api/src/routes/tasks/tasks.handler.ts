import type { IAppRouteHandler } from '@/lib/types'
import type {
  IGetByIdRoute,
  IInsertRoute,
  IListRoute,
} from '@/routes/tasks/tasks.routes'
import { TaskEntity } from '@workspace/database/schema/task.entity'
import { eq } from 'drizzle-orm'
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

export const getById: IAppRouteHandler<IGetByIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const [task] = await db.select()
    .from(TaskEntity)
    .where(eq(TaskEntity.id, id))
  if (!task) {
    return c.json({ message: `Task not found with id: ${id}` }, HttpCode.NOT_FOUND)
  }
  return c.json(task, HttpCode.OK)
}
