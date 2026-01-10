import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import z, { ZodError } from 'zod'

expand(config())

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(8000),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
})

export type Env = z.infer<typeof EnvSchema>

// eslint-disable-next-line import/no-mutable-exports ts/no-redeclare
let env: Env

try {
  // eslint-disable-next-line no-restricted-globals -- env.ts needs process.env for validation
  env = EnvSchema.parse(process.env)
} catch (e) {
  const error = e as ZodError
  console.error('Invalid environment variables:')
  console.error(error.flatten().fieldErrors)
  process.exit(1)
}

export default env
