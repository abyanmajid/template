import * as HttpCode from 'stoker/http-status-codes'
import { createMessageObjectSchema } from 'stoker/openapi/schemas'
import z from 'zod'

export const NotFoundSchema = createMessageObjectSchema(HttpCode.NOT_FOUND.toString())

export const IdParamSchema = z.object({
  id: z.uuid()
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
})
