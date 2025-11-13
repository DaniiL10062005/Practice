import { Card } from 'antd'
import { useState } from 'react'
import { CategoryModal } from '../CategoryModal'
import './category-item.scss'

type Props = {
  name: string
}

export const CategoryItem = ({ name }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false)
  return (
    <>
      <Card className="category-item-container" hoverable onClick={() => setModalOpen(true)}>
        {name}
      </Card>
      <CategoryModal isChange={true} isOpen={isModalOpen} setOpen={setModalOpen} />
    </>
  )
}
