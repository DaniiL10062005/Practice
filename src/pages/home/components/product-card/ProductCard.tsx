import { Card, Flex } from 'antd'
import { useState } from 'react'
import { ProductModal } from '../../../../components/product-modal/ProductModal'
import type { Book } from '../../../../utils/types/books'
import './ProductCard.scss'

const { Meta } = Card

type Props = {
  book: Book
}

export const ProductCard = ({ book }: Props) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Card
        onClick={() => setOpenModal(true)}
        hoverable
        cover={
          <img
            className="image"
            draggable={false}
            alt={book.title}
            src={`https://testapi.2neko.ru/files/${book.image}`}
          />
        }
      >
        <Meta
          title={book.title}
          description={
            <Flex vertical>
              {book.authors.map((author, index) => (
                <span key={index}>
                  {author.name}
                  {', '}
                </span>
              ))}
              <span>{book.price} руб.</span>
            </Flex>
          }
        />
      </Card>
      <ProductModal isCart={false} book={book} open={openModal} setOpen={setOpenModal} />
    </>
  )
}
