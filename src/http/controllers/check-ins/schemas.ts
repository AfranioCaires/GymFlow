import { z } from 'zod'

import { paginationSchema } from '@/config/pagination'

export const createCheckInParamsSchema = z.object({
  gymId: z.string().uuid(),
})

export const createCheckInBodySchema = z.object({
  userLatitude: z.number().refine((value) => Math.abs(value) <= 90),
  userLongitude: z.number().refine((value) => Math.abs(value) <= 180),
})

export const validateCheckInParamsSchema = z.object({
  checkInId: z.string().uuid(),
})

export const checkInHistoryQuerySchema = paginationSchema

export const checkInResponseSchema = z.object({
  checkIn: z.object({
    id: z.string().uuid(),
    created_at: z.date(),
    validated_at: z.date().nullable(),
    user_id: z.string().uuid(),
    gym_id: z.string().uuid(),
  }),
})

export const checkInHistoryResponseSchema = z.object({
  checkIns: z.array(
    z.object({
      id: z.string().uuid(),
      created_at: z.date(),
      validated_at: z.date().nullable(),
      user_id: z.string().uuid(),
      gym_id: z.string().uuid(),
    }),
  ),
})

export const userMetricsResponseSchema = z.object({
  checkInsCount: z.number(),
})
