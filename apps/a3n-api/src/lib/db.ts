import { initDBClient } from '@workspace/database'
import env from './env'

export const db = initDBClient(env.DATABASE_URL)
