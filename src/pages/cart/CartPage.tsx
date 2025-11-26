import { Flex } from 'antd'
import { CreationOrder } from './components/creation-order/CreationOrder'
import { CartProducts } from './components/cart-products/CartProducts'
import './cart.scss'
import { useAuthGuard } from '../../utils/hooks/use-auth-guard'

export const CartPage = () => {
  const { isAuthenticated } = useAuthGuard()
  if (!isAuthenticated) return null
  return (
    <Flex className="cart__flex" gap={20} style={{ height: '100%' }}>
      <CartProducts />
      <CreationOrder />
    </Flex>
  )
}
