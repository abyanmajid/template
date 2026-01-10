import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { defineConfig } from 'drizzle-kit'

// Load .env from root (when running from database dir, go up 2 levels)
expand(config({ path: '../../.env' }))

export default defineConfig({
  out: './src/migrations',
  schema: './src/schema/*.entity.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
