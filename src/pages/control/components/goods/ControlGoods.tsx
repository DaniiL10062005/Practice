import { Card, Flex } from 'antd'
import { ControlCategories } from './components/category/ControlCategories'
import { Goods } from './components/goods/Goods'

export const ControlGoods = () => {
  return (
    <Card>
      <Flex gap={50} align="start">
        <ControlCategories />
        <Goods />
      </Flex>
    </Card>
  )
}
