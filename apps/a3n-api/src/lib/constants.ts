import * as HttpCode from 'stoker/http-status-codes'
import { createMessageObjectSchema } from 'stoker/openapi/schemas'

export const NotFoundSchema = createMessageObjectSchema(HttpCode.NOT_FOUND.toString())
