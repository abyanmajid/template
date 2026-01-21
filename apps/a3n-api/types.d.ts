import type { Hono } from 'hono'

// This is a placeholder type - the actual type is inferred from the implementation
// but we export it here to avoid circular type-checking issues
export type IApi = Hono<any, any, any>
