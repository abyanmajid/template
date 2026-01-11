import type { IApi } from '../../a3n-api/src'
import { hc } from 'hono/client'

const client = hc<IApi>('http://localhost:8000')

export const apiClient = client.api
