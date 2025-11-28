import { Button, Card, Checkbox, Flex, Typography } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import './cart-product-card.scss'
import { ProductModal } from '../../../../../components/product-modal/ProductModal'
import { useEffect, useState } from 'react'
import type { Book } from '../../../../../utils/types/books'
import {
  useGetCartItems,
  useRemoveFromCart,
  useUpdateCartItem,
} from '../../../../../utils/queries/hooks/cart'

const { Meta } = Card
const { Text } = Typography
type Item = { book: Book; quantity: number; checked: boolean }

type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
  item: Item
}

type operation = 'add' | 'remove'

export const CartProductCard = ({ checked, onChange, item }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const { data } = useGetCartItems({ page: 1, limit: 100 })
  const [countInCart, setCountInCart] = useState<number>(0)
  const { mutate: updateCartItem } = useUpdateCartItem()
  const { mutate: removeFromCart } = useRemoveFromCart()

  useEffect(() => {
    if (data) {
      const cartItem = data.data.find((cartItem) => cartItem.book.id === item.book.id)
      if (cartItem) {
        setCountInCart(cartItem.quantity)
      } else {
        setCountInCart(0)
      }
    }
  }, [data])

  const updateCountInCart = (operation: operation, countInCart: number) => {
    if (operation === 'add') {
      updateCartItem({ book_id: item.book.id, quantity: countInCart + 1 })
    } else {
      if (countInCart - 1 > 0) {
        updateCartItem({ book_id: item.book.id, quantity: countInCart - 1 })
      } else {
        removeFromCart(item.book.id)
      }
    }
  }

  return (
    <>
      <Card className="cart-product" hoverable onClick={() => setOpenModal(true)}>
        <Flex className="cart-product__container" justify="space-between" align="center">
          <Flex className="cart-product__container" align="center">
            <img
              className="cart-product__image"
              draggable={false}
              alt="example"
              src={`https://testapi.2neko.ru/files/${item.book.image}`}
            />
            <Meta
              className="cart-product__meta"
              title={item.book.title}
              description={
                <Flex vertical>
                  {item.book.authors.map((author, index) => (
                    <span key={index}>{author.name}</span>
                  ))}
                  <span>{item.book.price} руб.</span>
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
              variant="solid"
              color="danger"
              onClick={(e) => {
                e.stopPropagation()
                updateCountInCart('remove', countInCart)
              }}
              style={{ padding: '10px' }}
            >
              <MinusOutlined />
            </Button>
            <Text className="cart-product__quantity">{countInCart}</Text>
            <Button
              variant="solid"
              color="green"
              onClick={(e) => {
                e.stopPropagation()
                updateCountInCart('add', countInCart)
              }}
              style={{ padding: '10px' }}
            >
              <PlusOutlined />
            </Button>
          </Flex>
        </Flex>
      </Card>
      <ProductModal book={item.book} open={openModal} setOpen={setOpenModal} isCart={true} />
    </>
  )
}
