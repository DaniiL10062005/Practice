import { Button, Checkbox, Flex, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import './cart-products.scss'
import { CartProductCard } from './components/CartProductCard'
import { useGetCartItems, useRemoveFromCart } from '../../../../utils/queries/hooks/cart'
import type { Book } from '../../../../utils/types/books'

const { Title } = Typography

type Item = { book: Book; quantity: number; checked: boolean }

export const CartProducts = () => {
  const { data } = useGetCartItems({ page: 1, limit: 100 })
  const [items, setItems] = useState<Item[]>([])
  const { mutate: removeFromCart } = useRemoveFromCart()

  useEffect(() => {
    if (!data) return

    setItems((prev) => {
      const prevCheckedById = new Map(prev.map((i) => [i.book.id, i.checked]))

      return data.data.map((item) => ({
        ...item,
        checked: prevCheckedById.get(item.book.id) ?? false,
      }))
    })
  }, [data])

  const allChecked = useMemo(() => items.length > 0 && items.every((i) => i.checked), [items])

  const anyChecked = useMemo(() => items.some((i) => i.checked), [items])

  const indeterminate = anyChecked && !allChecked

  const toggleAll = (checked: boolean) => {
    setItems((prev) => prev.map((i) => ({ ...i, checked })))
  }

  const toggleOne = (id: number, checked: boolean) => {
    setItems((prev) => prev.map((i) => (i.book.id === id ? { ...i, checked } : i)))
  }
  return (
    <Flex gap={20} vertical align="start" className="cart">
      <Flex style={{ width: '100%' }} gap={30} justify="space-between">
        <Flex gap={10} justify="center" align="center">
          <Title style={{ margin: 0 }} level={4}>
            Выбрать все
          </Title>
          <Checkbox
            checked={allChecked}
            indeterminate={indeterminate}
            onChange={(e) => toggleAll(e.target.checked)}
          />
        </Flex>
        <Button
          disabled={items.filter((i) => i.checked === true).length < 1}
          color="danger"
          variant="solid"
          onClick={() => {
            items.forEach((i) => {
              if (i.checked) {
                removeFromCart(i.book.id)
              }
            })
          }}
        >
          Удалить
        </Button>
      </Flex>

      <Flex gap={5} className="cart__products" vertical>
        {items.map((item) => (
          <CartProductCard
            key={item.book.id}
            checked={item.checked}
            item={item}
            onChange={(checked) => toggleOne(item.book.id, checked)}
          />
        ))}
      </Flex>
    </Flex>
  )
}
