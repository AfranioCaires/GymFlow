import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import apiReference from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { z, ZodError } from 'zod'

import { env } from './config/env'
import { checkInsRoutes } from './infra/http/routes/check-ins-routes'
import { gymsRoutes } from './infra/http/routes/gyms-routes'
import { usersRoutes } from './infra/http/routes/users-routes'

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
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Gympass API',
      description: 'API for gym check-ins and management',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(apiReference, {
  routePrefix: '/docs',
})

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

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
