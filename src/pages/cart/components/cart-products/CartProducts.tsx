import { Button, Checkbox, Flex, Typography } from 'antd'
import { useMemo, useState } from 'react'
import './cart-products.scss'
import { CartProductCard } from './components/CartProductCard'

const { Title } = Typography

type Item = { id: number; checked: boolean }

export const CartProducts = () => {
  const [items, setItems] = useState<Item[]>(
    Array.from({ length: 5 }, (_, i) => ({ id: i + 1, checked: false }))
  )

  const allChecked = useMemo(() => items.every((i) => i.checked), [items])
  const anyChecked = useMemo(() => items.some((i) => i.checked), [items])
  const indeterminate = anyChecked && !allChecked

  const toggleAll = (checked: boolean) => {
    setItems((prev) => prev.map((i) => ({ ...i, checked })))
  }

  const toggleOne = (id: number, checked: boolean) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked } : i)))
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
        >
          Удалить
        </Button>
      </Flex>

      <Flex gap={5} className="cart__products" vertical>
        {items.map((item) => (
          <CartProductCard
            key={item.id}
            checked={item.checked}
            onChange={(checked) => toggleOne(item.id, checked)}
          />
        ))}
      </Flex>
    </Flex>
  )
}
