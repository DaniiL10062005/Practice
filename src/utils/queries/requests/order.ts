import type { ListResponse } from '../../types/general'
import type {
  AdminGetOrderRequest,
  CreateOrderRequest,
  GetMyOrdersRequest,
  Order,
  UpdateOrderStatusRequest,
} from '../../types/order'
import { privateApi } from '../request-client'

export const CreateOrder = async (orderData: CreateOrderRequest): Promise<Order> => {
  try {
    const response = await privateApi.post('api/v1/orders/', orderData)
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const GetOrders = async (data: AdminGetOrderRequest): Promise<ListResponse<Order>> => {
  try {
    const response = await privateApi.get('api/v1/orders/', { params: data })
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const GetMyOrders = async (data: GetMyOrdersRequest): Promise<ListResponse<Order>> => {
  try {
    const response = await privateApi.get('api/v1/orders/my', { params: data })
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const UpdateOrder = async (
  order_id: number,
  data: UpdateOrderStatusRequest
): Promise<Order> => {
  try {
    const response = await privateApi.patch(`api/v1/orders/${order_id}`, data)
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const GetOrderById = async (order_id: number): Promise<Order> => {
  try {
    const response = await privateApi.get(`api/v1/orders/${order_id}/`)
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
