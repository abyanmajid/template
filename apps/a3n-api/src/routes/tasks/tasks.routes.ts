import { createRoute, z } from '@hono/zod-openapi'
import * as HttpCode from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'

const tags = ['Tasks']

export const list = createRoute({
  tags,
  path: '/tasks',
  method: 'get',
  responses: {
    [HttpCode.OK]: jsonContent(
      z.array(
        z.object({
          name: z.string(),
          done: z.boolean(),
        }),
      ),
      'Get all tasks',
    ),
  },
})

export type IListRoute = typeof list
