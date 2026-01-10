import { createRoute, z } from '@hono/zod-openapi'
import { InsertTaskSchema, SelectTaskSchema } from '@workspace/database/schema/task.entity'
import * as HttpCode from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema } from 'stoker/openapi/schemas'

const tags = ['Tasks']

export const list = createRoute({
  tags,
  path: '/tasks',
  method: 'get',
  responses: {
    [HttpCode.OK]: jsonContentRequired(z.array(SelectTaskSchema), 'List tasks'),
  },
})

export type IListRoute = typeof list

export const getById = createRoute({
  tags,
  path: '/tasks/{id}',
  method: 'get',
  request: {
    params: z.object({
      id: z.uuid(),
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  },
  responses: {
    [HttpCode.OK]: jsonContentRequired(z.array(SelectTaskSchema), 'List tasks'),
  },
})

export const insert = createRoute({
  tags,
  path: '/tasks',
  method: 'post',
  request: {
    body: jsonContent(InsertTaskSchema, 'Task data'),
  },
  responses: {
    [HttpCode.CREATED]: jsonContent(SelectTaskSchema, 'Created task'),
    [HttpCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(InsertTaskSchema),
      'Validation error',
    ),
  },
})

export type IInsertRoute = typeof insert
