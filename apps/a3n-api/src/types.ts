// Type-only exports to avoid circular type-checking issues
import type { Hono } from 'hono'

// Re-export the API type without importing the implementation
export type { IApi } from './index'
