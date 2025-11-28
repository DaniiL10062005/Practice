import { Button, Flex, Modal, Image, Typography } from 'antd'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import type { Book } from '../../utils/types/books'
import {
  useAddToCart,
  useGetCartItems,
  useRemoveFromCart,
  useUpdateCartItem,
} from '../../utils/queries/hooks/cart'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

const { Title } = Typography

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isCart?: boolean
  book: Book
}

type operation = 'add' | 'remove'

export const ProductModal = ({ open, setOpen, isCart, book }: Props) => {
  const { mutate: addToCart } = useAddToCart()
  const { data } = useGetCartItems({ page: 1, limit: 100 })
  const [countInCart, setCountInCart] = useState<number>(0)
  const { mutate: updateCartItem } = useUpdateCartItem()
  const { mutate: removeFromCart } = useRemoveFromCart()

  useEffect(() => {
    if (data) {
      const item = data.data.find((item) => item.book.id === book.id)
      if (item) {
        setCountInCart(item.quantity)
      } else {
        setCountInCart(0)
      }
    }
  }, [data])

  const updateCountInCart = (operation: operation, countInCart: number) => {
    if (operation === 'add') {
      updateCartItem({ book_id: book.id, quantity: countInCart + 1 })
    } else {
      if (countInCart - 1 > 0) {
        updateCartItem({ book_id: book.id, quantity: countInCart - 1 })
      } else {
        removeFromCart(book.id)
      }
    }
  }
  return (
    <Modal
      open={open}
      title={book.title}
      closable={false}
      footer={
        isCart
          ? [
              <Button key="back" onClick={() => setOpen(false)}>
                Назад
              </Button>,
            ]
          : countInCart !== 0
          ? [
              <Flex align="center" gap={5} justify="end">
                <Button
                  color="green"
                  variant="solid"
                  onClick={() => updateCountInCart('add', countInCart)}
                >
                  <PlusOutlined />
                </Button>
                <Title style={{ margin: '0px' }} level={5}>
                  {countInCart}
                </Title>
                <Button
                  color="danger"
                  variant="solid"
                  onClick={() => updateCountInCart('remove', countInCart)}
                >
                  <MinusOutlined />
                </Button>
                <Button key="back" onClick={() => setOpen(false)}>
                  Назад
                </Button>
              </Flex>,
            ]
          : [
              <Button
                key="submit"
                type="primary"
                onClick={() => addToCart({ book_id: book.id, quantity: 1 })}
              >
                Добавить в корзину
              </Button>,
              <Button key="back" onClick={() => setOpen(false)}>
                Назад
              </Button>,
            ]
      }
    >
      <Flex align="start" gap={10}>
        <Flex style={{ width: '50%' }}>
          <Image width="100%" src={`https://testapi.2neko.ru/files/${book.image}`} />
        </Flex>

        <Flex style={{ width: '50%' }} vertical>
          <p style={{ margin: '0' }}>Описание: {book.description}</p>
          {book.authors.map((author, index) => (
            <p key={index} style={{ margin: '0' }}>
              Автор: {author.name}
            </p>
          ))}
          <p>Цена: {book.price} руб.</p>
        </Flex>
      </Flex>
    </Modal>
  )
}
