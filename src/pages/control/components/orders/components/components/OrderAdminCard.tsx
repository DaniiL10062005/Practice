import { Card, Flex, theme, Typography } from 'antd'
import { useGetBookById } from '../../../../../../utils/queries/hooks/books'

const { Meta } = Card
const { Text } = Typography

type Props = {
  book_id: number
  quantity: number
}

export const OrderAdminCard = ({ book_id, quantity }: Props) => {
  const { data } = useGetBookById(book_id)
  const { token } = theme.useToken()

  return (
    <>
      <Card
        key={book_id}
        style={{
          backgroundColor: token.colorBgContainer,
          borderColor: token.colorBorderSecondary,
        }}
      >
        <Flex gap={20} align="center">
          <img width={100} src={`https://testapi.2neko.ru/files/${data?.image}`} />
          <Meta
            className="cart-product__meta"
            title={data?.authors.map((item, index) => (
              <Text key={index}>{item.name}</Text>
            ))}
            description={
              <Flex vertical>
                {data?.authors.map((author, index) => (
                  <span key={index}>{author.name}</span>
                ))}

                <span>{data?.price} руб.</span>
                <span>{quantity} шт.</span>
              </Flex>
            }
          />
        </Flex>
      </Card>
    </>
  )
}
