import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { registerUserUseCase } from '@/use-cases/register-user'

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const user = await registerUserUseCase({ name, email, password })

  return reply.status(201).send(user)
}
