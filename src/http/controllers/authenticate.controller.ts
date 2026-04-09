import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { AuthenticateUserUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials.error'
import { catchError } from '@/util/error-catcher'

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  })

  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUserUseCase = new AuthenticateUserUseCase(prismaUsersRepository)

  const data = authenticateBodySchema.parse(request.body)

  const [error, user] = await catchError(authenticateUserUseCase.execute(data), [
    InvalidCredentialsError,
  ])

  if (error) {
    return reply.status(400).send({ message: error.message })
  }

  return reply.status(200).send(user)
}
