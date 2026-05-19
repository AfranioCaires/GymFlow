import { z } from 'zod'

export const registerBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
})

export const authenticateBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export const userResponseSchema = z.object({
  user: z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.email(),
    created_at: z.date(),
  }),
})

export const authenticateResponseSchema = z.object({
  token: z.string(),
})
