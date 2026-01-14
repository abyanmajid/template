import type { ZodError } from 'zod';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import z from 'zod';

expand(config())

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number()
    .default(8000),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'])
    .default('info'),
  DATABASE_URL: z.url(),
})

export type IEnv = z.infer<typeof EnvSchema>

function loadEnv(): IEnv {
  try {
    // eslint-disable-next-line no-restricted-globals -- env.ts needs process.env for validation
    return EnvSchema.parse(process.env)
  }
  catch (e) {
    const error = e as ZodError

    console.error('Invalid environment variables:')

    console.error(error.flatten().fieldErrors)
    // eslint-disable-next-line no-restricted-globals -- process.exit is needed for fatal errors
    process.exit(1)
  }
}

const env = loadEnv()

export default env
