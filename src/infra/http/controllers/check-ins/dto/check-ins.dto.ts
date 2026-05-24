import { z } from 'zod'

export const createCheckInParamsSchema = z.object({
  gymId: z.uuid(),
})

export const createCheckInBodySchema = z.object({
  userLatitude: z.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  userLongitude: z.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

export const validateCheckInParamsSchema = z.object({
  checkInId: z.uuid(),
})

export const checkInHistoryQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
})

export type CreateCheckInParamsSchema = z.infer<typeof createCheckInParamsSchema>
export type CreateCheckInBodySchema = z.infer<typeof createCheckInBodySchema>
export type ValidateCheckInParamsSchema = z.infer<typeof validateCheckInParamsSchema>
export type CheckInHistoryQuerySchema = z.infer<typeof checkInHistoryQuerySchema>
