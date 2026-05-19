import { z } from 'zod'

import { paginationSchema } from '@/config/pagination'

export const createCheckInParamsSchema = z.object({
  gymId: z.uuid(),
})

export const createCheckInBodySchema = z.object({
  userLatitude: z.number().refine((value) => Math.abs(value) <= 90),
  userLongitude: z.number().refine((value) => Math.abs(value) <= 180),
})

export const validateCheckInParamsSchema = z.object({
  checkInId: z.uuid(),
})

export const checkInHistoryQuerySchema = paginationSchema

export const checkInResponseSchema = z.object({
  checkIn: z.object({
    id: z.uuid(),
    created_at: z.date(),
    validated_at: z.date().nullable(),
    user_id: z.uuid(),
    gym_id: z.uuid(),
  }),
})

export const checkInHistoryResponseSchema = z.object({
  checkIns: z.array(
    z.object({
      id: z.uuid(),
      created_at: z.date(),
      validated_at: z.date().nullable(),
      user_id: z.uuid(),
      gym_id: z.uuid(),
    }),
  ),
})

export const userMetricsResponseSchema = z.object({
  checkInsCount: z.number(),
})
