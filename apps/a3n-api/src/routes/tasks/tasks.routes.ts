import { createRoute, z } from '@hono/zod-openapi'
import {
  InsertTaskSchema,
  SelectTaskSchema,
  UpdateTaskSchema,
} from '@workspace/database/schema/task.entity'
import * as HttpCode from 'stoker/http-status-codes'
import {
  jsonContent,
  jsonContentOneOf,
  jsonContentRequired,
} from 'stoker/openapi/helpers'
import { createErrorSchema } from 'stoker/openapi/schemas'
import { IdParamSchema, NotFoundSchema } from '@/lib/constants'

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
      id: z.uuid()
        .openapi({
          param: {
            name: 'id',
            in: 'path',
          },
          example: '123e4567-e89b-12d3-a456-426614174000',
        }),
    }),
  },
  responses: {
    [HttpCode.OK]: jsonContentRequired(SelectTaskSchema, 'Task'),
    [HttpCode.NOT_FOUND]: jsonContent(
      NotFoundSchema,
      'Task not found',
    ),
    [HttpCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(z.object({
        id: z.string(),
      })),
      'Invalid task ID format',
    ),
  },
})

export type IGetByIdRoute = typeof getById

export const insert = createRoute({
  tags,
  path: '/tasks',
  method: 'post',
  request: {
    body: jsonContentRequired(InsertTaskSchema, 'Task data'),
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

export const updateById = createRoute({
  tags,
  path: '/tasks/{id}',
  method: 'put',
  request: {
    params: IdParamSchema,
    body: jsonContent(UpdateTaskSchema, 'Task updates'),
  },
  responses: {
    [HttpCode.OK]: jsonContent(SelectTaskSchema, 'Updated task'),
    [HttpCode.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [
        createErrorSchema(UpdateTaskSchema),
        createErrorSchema(IdParamSchema),
      ],
      'Validation error',
    ),
    [HttpCode.NOT_FOUND]: jsonContent(
      NotFoundSchema,
      'Task not found',
    ),
  },
})

export type IUpdateByIdRoute = typeof updateById

export const deleteById = createRoute({
  tags,
  path: '/tasks/{id}',
  method: 'delete',
  request: {
    params: IdParamSchema,
  },
  responses: {
    [HttpCode.NO_CONTENT]: {
      description: 'Task deleted',
    },
    [HttpCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamSchema),
      'Invalid ID format',
    ),
    [HttpCode.NOT_FOUND]: jsonContent(
      NotFoundSchema,
      'Task not found',
    ),
  },
})

export type IDeleteByIdRoute = typeof deleteById
