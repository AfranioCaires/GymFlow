import z from 'zod'

export const PAGINATION_DEFAULT_PAGE_SIZE = 20 as const

export type Pagination = {
  page?: number
  limit?: number
}

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).default(20),
})
