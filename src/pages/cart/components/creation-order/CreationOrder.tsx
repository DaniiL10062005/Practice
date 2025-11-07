import { Button, Card, Flex, Input } from 'antd'
import './creation-order.scss'
import { Typography } from 'antd'
const { Text } = Typography

export const CreationOrder = () => {
  return (
    <Card title="Оформление заказа" variant="borderless" className="order-card">
      <Flex vertical gap={20}>
        <Text>К оплате: {400} руб.</Text>
        <Input placeholder="Промокод" />
        <Button type="primary">Оформить заказ</Button>
      </Flex>
    </Card>
  )
}
