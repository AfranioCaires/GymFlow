import { fastify } from 'fastify'

import { env } from './config/env'

const app = fastify({
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

app.listen({
  port: env.PORT,
  host: env.HOST,
})
