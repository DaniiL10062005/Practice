import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CartItem, CartItemWithBook, CartRequest } from '../../types/cart'
import type { ListResponse, Pagination } from '../../types/general'
import { AddToCart, GetCartItems, RemoveFromCart, UpdateCartItem } from '../requests/cart'

export const useGetCartItems = (params: Pagination<undefined>) => {
  return useQuery<ListResponse<CartItemWithBook>, Error>({
    queryKey: ['cart', params],
    queryFn: () => GetCartItems(params),
  })
}

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  return useMutation<CartItem, Error, CartRequest>({
    mutationFn: AddToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, Error, number>({
    mutationFn: (book_id: number) => RemoveFromCart(book_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient()

  return useMutation<CartItemWithBook, Error, CartRequest>({
    mutationFn: UpdateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}
