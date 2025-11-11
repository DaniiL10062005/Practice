import { Button, Card, Flex, Input } from 'antd'
import './creation-order.scss'
import { Typography } from 'antd'
import { CreateOrderModal } from '../creat-order-modal/CreateOrderModal'
import { useState } from 'react'
const { Text } = Typography

export const CreationOrder = () => {
  const [isOpen, setOpen] = useState<boolean>(false)
  return (
    <Card title="Оформление заказа" variant="borderless" className="order-card">
      <Flex vertical gap={20}>
        <Text>К оплате: {400} руб.</Text>
        <Input placeholder="Промокод" />
        <Button onClick={() => setOpen(true)} type="primary">
          Оформить заказ
        </Button>
      </Flex>
      <CreateOrderModal open={isOpen} setOpen={setOpen} />
    </Card>
  )
}
