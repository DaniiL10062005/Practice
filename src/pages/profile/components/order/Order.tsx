import { Flex, Typography, Avatar, Collapse, theme } from 'antd'
import './order.scss'
import type { Order as OrderItem } from '../../../../utils/types/order'
import { ORDER_STATUS } from '../../../../utils/constants/order-status'
import { OrderBook } from './components/OrderBook'
import { OrderAvatars } from './components/OrderAvatars'

const { Text } = Typography

type Props = {
  item: OrderItem
}

export const Order = ({ item }: Props) => {
  const { token } = theme.useToken()

  const items = [
    {
      key: '1',
      label: (
        <Flex className="order__container" gap={15} justify="space-between">
          <Text>Номер заказа: {item.id}</Text>
          <Text>{ORDER_STATUS[item.status]}</Text>
          <Avatar.Group shape="square">
            {item.order_items.map((book, index) => (
              <OrderAvatars key={index} book_id={book.book_id} />
            ))}
          </Avatar.Group>
        </Flex>
      ),
      children: (
        <Flex vertical gap={10}>
          {item.order_items.map((book, index) => (
            <OrderBook quantity={book.quantity} key={index} book_id={book.book_id} />
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
        }}
      />
    </>
  )
}
