import { z } from 'zod'

export const createGymBodySchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  phone: z.string().nullable(),
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

export const searchGymsQuerySchema = z.object({
  query: z.string(),
  page: z.coerce.number().min(1).default(1),
})

export const nearbyGymsQuerySchema = z.object({
  userLatitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  userLongitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
  page: z.coerce.number().min(1).default(1),
})

export type CreateGymBodySchema = z.infer<typeof createGymBodySchema>
export type SearchGymsQuerySchema = z.infer<typeof searchGymsQuerySchema>
export type NearbyGymsQuerySchema = z.infer<typeof nearbyGymsQuerySchema>
