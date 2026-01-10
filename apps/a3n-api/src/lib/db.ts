import { initDBClient } from '@workspace/database/client'
import env from '@/lib/env'

const db = initDBClient(env.DATABASE_URL)

export default db
