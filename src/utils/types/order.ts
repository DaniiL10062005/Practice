import type { ORDER_STATUS } from '../constants/order-status'

export type OrderStatus = keyof typeof ORDER_STATUS

export type Order = {
  id: number
  order_items: [
    {
      book_id: number
      quantity: number
      price_at_time: number
    }
  ]
  user_id: number
  status: OrderStatus
  total_amount: number
  shipping_address: string
  shipping_phone: string
  tracking_number: string
}

export type AdminGetOrderRequest = {
  user_id?: number
  status?: OrderStatus
  page?: number
  limit?: number
  search_text?: string
}

export type CreateOrderRequest = {
  items: {
    book_id: number
    quantity: number
  }[]
  shipping_address: string
  shipping_phone: string
}

export type GetMyOrdersRequest = {
  page?: number
  limit?: number
  status?: OrderStatus
  search_text?: string
}

export type UpdateOrderStatusRequest = {
  tracking_number?: string
  status: OrderStatus
}
