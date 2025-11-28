export const ORDER_STATUS = {
  pending: 'В Обработке',
  confirmed: 'Подтвержден',
  shipped: 'Отправлен',
  delivered: 'Доставлен',
  cancelled: 'Отменен',
} as const

export type OrderStatus = keyof typeof ORDER_STATUS
