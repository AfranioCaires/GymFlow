import { z } from 'zod'

export const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const userResponseSchema = z.object({
  user: z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.string().email(),
    created_at: z.date(),
  }),
})

export const authenticateResponseSchema = z.object({
  token: z.string(),
})

export type RegisterBodySchema = z.infer<typeof registerBodySchema>
export type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>
export type UserResponseSchema = z.infer<typeof userResponseSchema>
export type AuthenticateResponseSchema = z.infer<typeof authenticateResponseSchema>
