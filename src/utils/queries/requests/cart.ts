import type { CartItem, CartItemWithBook, CartRequest } from '../../types/cart'
import type { ListResponse, Pagination } from '../../types/general'
import { privateApi } from '../request-client'

export const AddToCart = async (data: CartRequest): Promise<CartItem> => {
  try {
    const response = await privateApi.post(`api/v1/shopping_cart/`, undefined, { params: data })
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const RemoveFromCart = async (book_id: number) => {
  try {
    const response = await privateApi.delete('api/v1/shopping_cart/', { params: { book_id } })
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const UpdateCartItem = async (data: CartRequest): Promise<CartItemWithBook> => {
  try {
    const response = await privateApi.patch('api/v1/shopping_cart/', undefined, { params: data })
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const GetCartItems = async (
  data: Pagination<undefined>
): Promise<ListResponse<CartItemWithBook>> => {
  try {
    const response = await privateApi.get('api/v1/shopping_cart/', { params: data })
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
