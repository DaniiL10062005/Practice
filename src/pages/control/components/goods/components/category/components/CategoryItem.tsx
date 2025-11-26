import { Card, Flex, Typography } from 'antd'
import { useState } from 'react'
import { CategoryModal } from '../CategoryModal'
import './category-item.scss'
import { EditOutlined } from '@ant-design/icons'

const { Text } = Typography

type Props = {
  name: string
}

export const CategoryItem = ({ name }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false)
  return (
    <>
      <Card className="category-item-container" hoverable>
        <Flex align="center" justify="space-between">
          <Text>{name}</Text>
          <EditOutlined onClick={() => setModalOpen(true)} />
        </Flex>
      </Card>
      <CategoryModal isChange={true} isOpen={isModalOpen} setOpen={setModalOpen} />
    </>
  )
}
