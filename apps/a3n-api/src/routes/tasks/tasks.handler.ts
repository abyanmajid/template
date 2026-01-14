import type { IAppRouteHandler } from '@/lib/types'
import type {
  IDeleteByIdRoute,
  IGetByIdRoute,
  IInsertRoute,
  IListRoute,
  IUpdateByIdRoute,
} from '@/routes/tasks/tasks.routes'
import { tasks } from '@workspace/database/schema/task.entity'
import { eq } from 'drizzle-orm'
import * as HttpCode from 'stoker/http-status-codes'
import db from '@/lib/db'

export const list: IAppRouteHandler<IListRoute> = async (c) => {
  const tasksList = await db.select()
    .from(tasks)

  return c.json(tasksList, HttpCode.OK)
}

export const getById: IAppRouteHandler<IGetByIdRoute> = async (c) => {
  const { id } = c.req.valid('param')

  const [task] = await db.select()
    .from(tasks)
    .where(eq(tasks.id, id))

  if (!task) {
    return c.json({ message: `Task not found with id: ${id}` }, HttpCode.NOT_FOUND)
  }

  return c.json(task, HttpCode.OK)
}

export const insert: IAppRouteHandler<IInsertRoute> = async (c) => {
  const body = c.req.valid('json')

  const [newTask] = await db.insert(tasks)
    .values(body)
    .returning()

  return c.json(newTask, HttpCode.CREATED)
}

export const updateById: IAppRouteHandler<IUpdateByIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const updates = c.req.valid('json')

  const [task] = await db.update(tasks)
    .set(updates)
    .where(eq(tasks.id, id))
    .returning()

  if (!task) {
    return c.json({ message: `Task not found with id: ${id}` }, HttpCode.NOT_FOUND)
  }

  return c.json(task, HttpCode.OK)
}

export const deleteById: IAppRouteHandler<IDeleteByIdRoute> = async (c) => {
  const { id } = c.req.valid('param')

  const result = await db.delete(tasks)
    .where(eq(tasks.id, id))
    .returning()

  if (result.length === 0) {
    return c.json({ message: `Task not found with id: ${id}` }, HttpCode.NOT_FOUND)
  }

  return c.body(null, HttpCode.NO_CONTENT)
}
