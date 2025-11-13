import { PlusOutlined } from '@ant-design/icons'
import { Button, Flex, Typography } from 'antd'
import { useState } from 'react'
import { CategoryModal } from './CategoryModal'
import { CategoryItem } from './components/CategoryItem'
import './categories.scss'

const { Title } = Typography

export const ControlCategories = () => {
  const [isModalOpen, setModalOpen] = useState(false)

  const categories = Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    name: `Категория ${i + 1}`,
  }))

  return (
    <>
      <Flex gap={30} className="container" vertical>
        <Flex gap={30} align="center">
          <Title style={{ margin: '0' }} level={4}>
            Категории
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
        <Flex gap={10} className="container__category" vertical>
          {categories.map((cat) => (
            <CategoryItem key={cat.id} name={cat.name} />
          ))}
        </Flex>
      </Flex>
      <CategoryModal isChange={false} isOpen={isModalOpen} setOpen={setModalOpen} />
    </>
  )
}
