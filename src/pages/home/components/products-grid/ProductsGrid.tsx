import { Flex } from 'antd'
import { ProductCard } from '../product-card/ProductCard'
import type { Book } from '../../../../utils/types/books'

type Props = {
  books: Book[] | undefined
}

export const ProductsGrid = ({ books }: Props) => {
  return (
    <Flex wrap justify="center" gap={20}>
      {books?.map((book) => (
        <ProductCard key={book.id} book={book} />
      ))}
    </Flex>
  )
}
