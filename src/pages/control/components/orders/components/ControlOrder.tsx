import { Flex, Typography, Avatar, Collapse, theme, Select } from 'antd'
import './control-order.scss'
import type { Order } from '../../../../../utils/types/order'
import { ORDER_STATUS, type OrderStatus } from '../../../../../utils/constants/order-status'
import { OrderAdminAvatar } from './components/OrderAdminAvatar'
import { OrderAdminCard } from './components/OrderAdminCard'
import { useEffect, useState } from 'react'
import { useUpdateOrder } from '../../../../../utils/queries/hooks/order'

const { Text } = Typography

type ControlOrderProps = {
  order: Order
}

export const ControlOrder = ({ order }: ControlOrderProps) => {
  const { token } = theme.useToken()
  const [status, setStatus] = useState<OrderStatus>(order.status)
  const { mutate, isPending } = useUpdateOrder()

  useEffect(() => {
    mutate(
      { order_id: order.id, data: { status: status } },
      {
        onSuccess: (resp) => {
          setStatus(resp.status)
        },
      }
    )
  }, [status])

  const items = [
    {
      key: '1',
      label: (
        <Flex style={{ width: '100%' }} className="control-order" gap={15} justify="space-between">
          <Text>Номер заказа: {order.id}</Text>
          <Text>Трек номер: {order.tracking_number}</Text>
          <Select
            disabled={isPending}
            defaultValue={status}
            onChange={(value) => setStatus(value as OrderStatus)}
            style={{ width: 120 }}
            onClick={(e) => {
              e.stopPropagation()
            }}
            options={[
              { value: 'pending', label: ORDER_STATUS.pending },
              { value: 'confirmed', label: ORDER_STATUS.confirmed },
              { value: 'delivered', label: ORDER_STATUS.delivered },
              { value: 'shipped', label: ORDER_STATUS.shipped },
              { value: 'cancelled', label: ORDER_STATUS.cancelled },
            ]}
          />
          <Avatar.Group style={{ width: '100px', overflow: 'hidden' }} shape="square">
            {order.order_items.map((book, index) => (
              <OrderAdminAvatar key={index} book_id={book.book_id} />
            ))}
          </Avatar.Group>
        </Flex>
      ),
      children: (
        <Flex vertical gap={10}>
          {order.order_items.map((order, index) => (
            <OrderAdminCard book_id={order.book_id} quantity={order.quantity} key={index} />
          ))}
        </Flex>
      ),
    },
  ]

  return (
    <>
      <Collapse
        items={items}
        style={{
          backgroundColor: token.colorBgContainer,
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowTertiary,
          border: `1px solid ${token.colorBorderSecondary}`,
          width: '100%',
        }}
      />
    </>
  )
}
