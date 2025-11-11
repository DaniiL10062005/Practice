import { Flex, Typography, Avatar, Collapse, Card, theme } from 'antd'
import './order.scss'
import { useState } from 'react'
import { ProductModal } from '../../../../components/product-modal/ProductModal'

const { Text } = Typography
const { Meta } = Card

export const Order = () => {
  const { token } = theme.useToken()
  const [openModal, setOpenModal] = useState(false)

  const items = [
    {
      key: '1',
      label: (
        <Flex className="order__container" gap={15} justify="space-between">
          <Text>Номер заказа: 12345</Text>
          <Text>Дата: {new Date().toLocaleDateString('ru-RU')}</Text>
          <Text>Статус: Доставлен</Text>
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
              hoverable
              onClick={() => setOpenModal(true)}
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
      <ProductModal setOpen={setOpenModal} open={openModal} />
    </>
  )
}
