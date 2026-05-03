import fastifyJwt from '@fastify/jwt'
import { fastify } from 'fastify'
import { z, ZodError } from 'zod'

import { env } from './config/env'
import { userRoutes } from './http/controllers/users/user.routes'

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

app.register(userRoutes)
app.register(fastifyJwt, { secret: env.JWT_SECRET })

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: z.treeifyError(error),
    })
  }

  if (env.NODE_ENV !== 'production') {
    app.log.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
