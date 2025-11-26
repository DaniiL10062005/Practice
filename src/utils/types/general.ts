export type ListResponse<T> = {
  data: T[]
  meta: {
    offset: number
    limit: number
    returned: number
    total: number
  }
}

export type Pagination<T> = {
  data?: T[]
  page: number
  limit: number
}
