import { useMutation } from '@tanstack/react-query'
import type { Book, CreateBookRequest, GetBookRequest, UpdateBookRequest } from '../../types/books'
import { CreateBook, DeleteBook, GetBook, GetBookById, UpdateBook } from '../requests/books'
import type { ListResponse } from '../../types/general'

export const useCreateBook = () => {
  return useMutation<Book, Error, CreateBookRequest>({
    mutationFn: (data) => CreateBook(data),
  })
}

export const useGetBooks = () => {
  return useMutation<ListResponse<Book>, Error, GetBookRequest>({
    mutationFn: (params) => GetBook(params),
  })
}

export const useUpdateBook = () => {
  return useMutation<Book, Error, UpdateBookRequest>({
    mutationFn: (data) => UpdateBook(data),
  })
}

export const useGetBookById = () => {
  return useMutation<Book, Error, number>({
    mutationFn: (id) => GetBookById(id),
  })
}

export const useDeleteBook = () => {
  return useMutation<null, Error, number>({
    mutationFn: (id) => DeleteBook(id),
  })
}
