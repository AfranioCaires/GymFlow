import { PrismaPg } from '@prisma/adapter-pg'

import { env } from '@/config/env'
import { PrismaClient } from '@/generated/prisma/client'

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  })

  return new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === 'development'
        ? [
            { emit: 'event', level: 'query' },
            { emit: 'event', level: 'error' },
            { emit: 'event', level: 'warn' },
            { emit: 'event', level: 'info' },
          ]
        : [],
  })
}

export const prisma = createPrismaClient()

export function registerPrismaLogs(logger: {
  info: (obj: object, msg: string) => void
  error: (obj: object, msg: string) => void
  warn: (obj: object, msg: string) => void
}) {
  prisma.$on('query', (e) => {
    const params = JSON.parse(e.params) as unknown[]

    const query = e.query
      .replaceAll('\\"', '"')
      .replaceAll('"', '')
      .replace(/\$(\d+)/g, (_, i) => String(params[Number(i) - 1]))

    logger.info({ query, duration: e.duration }, 'Prisma query')
  })

  prisma.$on('error', (e) => {
    logger.error({ error: e }, 'Prisma error')
  })

  prisma.$on('warn', (e) => {
    logger.warn({ warning: e }, 'Prisma warning')
  })
}
