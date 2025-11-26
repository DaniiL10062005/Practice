import { Flex } from 'antd'
import { ProfileData } from './components/profile-data/ProfileData'
import { ProfileOrders } from './components/profile-orders/ProfileOrders'
import './profile-page.scss'
import { useAuthGuard } from '../../utils/hooks/use-auth-guard'

export const ProfilePage = () => {
  const { isAuthenticated } = useAuthGuard()
  if (!isAuthenticated) return null
  return (
    <Flex className="profile-page__container" gap={20} align="center" justify="space-between">
      <ProfileData />
      <ProfileOrders />
    </Flex>
  )
}
