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

export type CreateCheckInParamsSchema = z.infer<typeof createCheckInParamsSchema>
export type CreateCheckInBodySchema = z.infer<typeof createCheckInBodySchema>
export type ValidateCheckInParamsSchema = z.infer<typeof validateCheckInParamsSchema>
export type CheckInHistoryQuerySchema = z.infer<typeof checkInHistoryQuerySchema>
export type CheckInResponseSchema = z.infer<typeof checkInResponseSchema>
export type CheckInHistoryResponseSchema = z.infer<typeof checkInHistoryResponseSchema>
export type UserMetricsResponseSchema = z.infer<typeof userMetricsResponseSchema>
