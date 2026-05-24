import { z } from 'zod'

import { paginationSchema } from '@/config/pagination'

export const createGymBodySchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  phone: z.string().nullable(),
  latitude: z.number().refine((value) => Math.abs(value) <= 90),
  longitude: z.number().refine((value) => Math.abs(value) <= 180),
})

export const searchGymsQuerySchema = z
  .object({
    query: z.string(),
  })
  .extend(paginationSchema.shape)

export const nearbyGymsQuerySchema = z
  .object({
    userLatitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    userLongitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  })
  .extend(paginationSchema.shape)

export const gymResponseSchema = z.object({
  gym: z.object({
    id: z.uuid(),
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number(),
    longitude: z.number(),
  }),
})

export const gymsResponseSchema = z.object({
  gyms: z.array(
    z.object({
      id: z.uuid(),
      title: z.string(),
      description: z.string().nullable(),
      phone: z.string().nullable(),
      latitude: z.number(),
      longitude: z.number(),
    }),
  ),
})

export type CreateGymBodySchema = z.infer<typeof createGymBodySchema>
export type SearchGymsQuerySchema = z.infer<typeof searchGymsQuerySchema>
export type NearbyGymsQuerySchema = z.infer<typeof nearbyGymsQuerySchema>
export type GymResponseSchema = z.infer<typeof gymResponseSchema>
export type GymsResponseSchema = z.infer<typeof gymsResponseSchema>
