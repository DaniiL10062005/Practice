import { useMutation } from '@tanstack/react-query'
import type { Author, CreateAuthorResponse } from '../../types/authors'
import type { ListResponse, Pagination } from '../../types/general'
import {
  CreateAuthor,
  DeleteAuthor,
  GetAuthor,
  GetAuthorById,
  UpdateAuthor,
} from '../requests/authors'

export const useCreateAuthor = () => {
  return useMutation<Author, Error, CreateAuthorResponse>({
    mutationFn: (data) => CreateAuthor(data),
  })
}

export const useGetAuthors = () => {
  return useMutation<ListResponse<Author>, Error, Pagination<undefined>>({
    mutationFn: (params) => GetAuthor(params),
  })
}

export const useUpdateAuthor = () => {
  return useMutation<Author, Error, Author>({
    mutationFn: (data) => UpdateAuthor(data),
  })
}

export const useGetAuthorById = () => {
  return useMutation<Author, Error, number>({
    mutationFn: (id) => GetAuthorById(id),
  })
}

export const useDeleteAuthor = () => {
  return useMutation<null, Error, number>({
    mutationFn: (id) => DeleteAuthor(id),
  })
}
