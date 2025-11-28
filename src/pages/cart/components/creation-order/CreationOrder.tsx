import { Button, Card, Flex, Input } from 'antd'
import './creation-order.scss'
import { Typography } from 'antd'
import { CreateOrderModal } from '../creat-order-modal/CreateOrderModal'
import { useState } from 'react'
import { useGetCartItems } from '../../../../utils/queries/hooks/cart'
const { Text } = Typography

export const CreationOrder = () => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const { data } = useGetCartItems({ page: 1, limit: 100 })

  return (
    <Card title="Оформление заказа" variant="borderless" className="order-card">
      <Flex vertical gap={20}>
        <Text>
          К оплате:{' '}
          {data
            ? data.data?.reduce((total, item) => total + item.book.price * item.quantity, 0)
            : 0}{' '}
          руб.
        </Text>
        <Input placeholder="Промокод" />
        <Button onClick={() => setOpen(true)} type="primary">
          Оформить заказ
        </Button>
      </Flex>
      <CreateOrderModal open={isOpen} setOpen={setOpen} />
    </Card>
  )
}
