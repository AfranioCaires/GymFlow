import { fastify } from 'fastify'

import { env } from '@/config/env'

import { registerPrismaLogs } from './infra/database/prisma'

export const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
})

registerPrismaLogs(app.log)

app.listen({
  port: env.PORT,
  host: env.HOST,
})
