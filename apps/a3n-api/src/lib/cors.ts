import env from '@/lib/env'

export function getCorsOrigins(): string[] {
  switch (env.NODE_ENV) {
    case 'development':
      return ['http://localhost:3000']
    case 'production':
      return []
    case 'test':
      return []
  }
}
