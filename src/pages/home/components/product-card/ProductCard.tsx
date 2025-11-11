import { Card, Flex } from 'antd'
import { useState } from 'react'
import { ProductModal } from '../../../../components/product-modal/ProductModal'

const { Meta } = Card

export const ProductCard = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <Card
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
      <ProductModal open={openModal} setOpen={setOpenModal} />
    </>
  )
}
