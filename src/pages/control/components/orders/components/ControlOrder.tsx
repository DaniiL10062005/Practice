import { Flex, Typography, Avatar, Collapse, Card, theme, Select } from 'antd'
import './control-order.scss'
import type { good } from '../../../../../utils/types/good'

const { Text } = Typography
const { Meta } = Card

type ControlOrderProps = {
  id: string
  date: string
  deliveryStatus: string
  goods: good[] | null
}

export const ControlOrder = ({ id, date, deliveryStatus }: ControlOrderProps) => {
  const { token } = theme.useToken()
  const items = [
    {
      key: '1',
      label: (
        <Flex className="control-order" gap={15} justify="space-between">
          <Text>Номер заказа: {id}</Text>
          <Text>Дата: {date}</Text>
          <Select
            defaultValue={deliveryStatus}
            style={{ width: 120 }}
            onClick={(e) => {
              e.stopPropagation()
            }}
            options={[
              { value: 'inProcessing', label: 'В обработке' },
              { value: 'onWay', label: 'Доставляется' },
              { value: 'delivered', label: 'Доставлен' },
              { value: 'formed', label: 'Формируется' },
            ]}
          />
          <Avatar.Group shape="square">
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1x1h3e0DuqB_WaGGeu-R4joMCiwqw-C6dQ&s" />
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1x1h3e0DuqB_WaGGeu-R4joMCiwqw-C6dQ&s" />
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1x1h3e0DuqB_WaGGeu-R4joMCiwqw-C6dQ&s" />
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1x1h3e0DuqB_WaGGeu-R4joMCiwqw-C6dQ&s" />
          </Avatar.Group>
        </Flex>
      ),
      children: (
        <Flex vertical gap={10}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
            <Card
              key={index}
              style={{
                backgroundColor: token.colorBgContainer,
                borderColor: token.colorBorderSecondary,
              }}
            >
              <Flex gap={20} align="center">
                <img
                  width={100}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1x1h3e0DuqB_WaGGeu-R4joMCiwqw-C6dQ&s"
                />
                <Meta
                  className="cart-product__meta"
                  title={`Название книги ${index + 1}`}
                  description={
                    <Flex vertical>
                      <span>Автор</span>
                      <span>Цена руб.</span>
                      <span>Количество</span>
                    </Flex>
                  }
                />
              </Flex>
            </Card>
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
