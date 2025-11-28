import { Avatar } from 'antd'
import { useGetBookById } from '../../../../../utils/queries/hooks/books'

type Props = {
  book_id: number
}

export const OrderAvatars = ({ book_id }: Props) => {
  const { data } = useGetBookById(book_id)
  return <Avatar src={`https://testapi.2neko.ru/files/${data?.image}`} />
}
