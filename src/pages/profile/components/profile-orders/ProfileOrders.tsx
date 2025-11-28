import { Flex } from 'antd'
import { Order } from '../order/Order'
import './profile-orders.scss'
import { useGetMyOrders } from '../../../../utils/queries/hooks/order'

export const ProfileOrders = () => {
  const { data: cartItems } = useGetMyOrders({ page: 1, limit: 20 })
  return (
    <Flex gap={5} className="profile-orders__orders" vertical>
      {cartItems?.data.map((item, index) => (
        <Order item={item} key={index} />
      ))}
    </Flex>
  )
}
