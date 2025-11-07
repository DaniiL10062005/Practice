import { Flex } from 'antd'
import { Order } from '../order/Order'
import './profile-orders.scss'

export const ProfileOrders = () => {
  return (
    <Flex gap={5} className="profile-orders__orders" vertical>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
        <Order key={item} />
      ))}
    </Flex>
  )
}
