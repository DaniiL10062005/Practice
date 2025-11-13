import { Card, Flex } from 'antd'
import { useState } from 'react'
import './good-card.scss'
import { GoodModal } from './GoodModal'

const { Meta } = Card

export const GoodCard = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <Card
        className="container"
        onClick={() => setOpenModal(true)}
        hoverable
        cover={
          <img
            draggable={false}
            alt="example"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1x1h3e0DuqB_WaGGeu-R4joMCiwqw-C6dQ&s"
          />
        }
      >
        <Meta
          title="Название книги"
          description={
            <Flex vertical>
              <span>Автор</span>
              <span>Цена руб.</span>
            </Flex>
          }
        />
      </Card>
      <GoodModal isOpen={openModal} setOpen={setOpenModal} isChange={true} />
    </>
  )
}
