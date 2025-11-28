import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { AdminGetOrderRequest, CreateOrderRequest, GetMyOrdersRequest, Order, UpdateOrderStatusRequest } from "../../types/order"
import { CreateOrder, GetMyOrders, GetOrderById, GetOrders, UpdateOrder } from "../requests/order"
import type { ListResponse } from "../../types/general"

export const useGetOrders = (params: AdminGetOrderRequest) => {
  return useQuery<ListResponse<Order>, Error>({
    queryKey: ['orders', 'admin', params],
    queryFn: () => GetOrders(params),
  })
}

export const useGetMyOrders = (params: GetMyOrdersRequest) => {
  return useQuery<ListResponse<Order>, Error>({
    queryKey: ['orders', 'my', params],
    queryFn: () => GetMyOrders(params),
  })
}

export const useGetOrderById = (order_id: number | undefined) => {
  return useQuery<Order, Error>({
    queryKey: ['orders', 'detail', order_id],
    queryFn: () => {
      if (order_id == null) {
        return Promise.reject(new Error('order_id is required')) as Promise<Order>
      }
      return GetOrderById(order_id)
    },
    enabled: order_id != null,
  })
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation<Order, Error, CreateOrderRequest>({
    mutationFn: CreateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}

type UpdateOrderVariables = {
  order_id: number
  data: UpdateOrderStatusRequest
}

export const useUpdateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation<Order, Error, UpdateOrderVariables>({
    mutationFn: ({ order_id, data }) => UpdateOrder(order_id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({
        queryKey: ['orders', 'detail', variables.order_id],
      })
    },
  })
}
