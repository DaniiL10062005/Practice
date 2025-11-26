import { useMutation } from '@tanstack/react-query'
import type { CreateGenreRequest, Genre } from '../../types/genres'
import {
  CreateGenre,
  DeleteGenres,
  GetGenres,
  GetGenresById,
  UpdateGenres,
} from '../requests/genres'
import type { ListResponse, Pagination } from '../../types/general'

export const useCreateGenre = () => {
  return useMutation<Genre, Error, CreateGenreRequest>({
    mutationFn: (data) => CreateGenre(data),
  })
}

export const useGetGenres = () => {
  return useMutation<ListResponse<Genre>, Error, Pagination<undefined>>({
    mutationFn: (params) => GetGenres(params),
  })
}

export const useUpdateGenre = () => {
  return useMutation<Genre, Error, Genre>({
    mutationFn: (data) => UpdateGenres(data),
  })
}

export const useGetGenreById = () => {
  return useMutation<Genre, Error, number>({
    mutationFn: (id) => GetGenresById(id),
  })
}

export const useDeleteGenre = () => {
  return useMutation<null, Error, number>({
    mutationFn: (id) => DeleteGenres(id),
  })
}
