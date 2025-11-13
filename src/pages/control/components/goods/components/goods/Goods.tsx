import { Button, Flex, Pagination, Typography } from 'antd'
import { GoodCard } from './components/GoodCard'
import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { GoodModal } from './components/GoodModal'

const { Title } = Typography

export const Goods = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  return (
    <Flex align="center" gap={30} vertical>
      <Flex style={{ width: '100%' }} align="center" justify="space-between">
        <Title style={{ margin: '0' }} level={4}>
          Товары
        </Title>
        <Button
          onClick={() => setModalOpen(true)}
          style={{ padding: '10px' }}
          color="blue"
          variant="solid"
        >
          <PlusOutlined />
        </Button>
      </Flex>

      <Flex gap={10} wrap>
        {Array.from({ length: 5 }).map((_, i) => (
          <GoodCard key={i} />
        ))}
      </Flex>
      <Pagination defaultCurrent={1} total={50} />
      <GoodModal isChange={false} isOpen={isModalOpen} setOpen={setModalOpen} />
    </Flex>
  )
}
