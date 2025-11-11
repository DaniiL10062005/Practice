import { Button, Card, Checkbox, Flex, Typography } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import './cart-product-card.scss'
import { ProductModal } from '../../../../../components/product-modal/ProductModal'
import { useState } from 'react'

const { Meta } = Card
const { Text } = Typography

type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
}

export const CartProductCard = ({ checked, onChange }: Props) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Card className="cart-product" hoverable onClick={() => setOpenModal(true)}>
        <Flex className="cart-product__container" justify="space-between" align="center">
          <Flex className="cart-product__container" align="center">
            <img
              className="cart-product__image"
              draggable={false}
              alt="example"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1x1h3e0DuqB_WaGGeu-R4joMCiwqw-C6dQ&s"
            />
            <Meta
              className="cart-product__meta"
              title="Название книги"
              description={
                <Flex vertical>
                  <span>Автор</span>
                  <span>Цена руб.</span>
                </Flex>
              }
            />
          </Flex>

          <Checkbox
            className="cart-product__checkbox"
            checked={checked}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => onChange(e.target.checked)}
          />

          <Flex align="center" gap={10}>
            <Button
              onClick={(e) => {
                e.stopPropagation()
              }}
              style={{ padding: '10px' }}
            >
              <MinusOutlined />
            </Button>
            <Text className="cart-product__quantity">1</Text>
            <Button
              onClick={(e) => {
                e.stopPropagation()
              }}
              style={{ padding: '10px' }}
            >
              <PlusOutlined />
            </Button>
          </Flex>
        </Flex>
      </Card>
      <ProductModal open={openModal} setOpen={setOpenModal} isCart={true} />
    </>
  )
}
