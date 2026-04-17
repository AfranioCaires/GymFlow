export const PAGINATION_DEFAULT_PAGE_SIZE = 20 as const

export type Pagination = {
  page?: number
  limit?: number
}
