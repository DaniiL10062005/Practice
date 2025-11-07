import { Flex } from 'antd'
import { ProfileData } from './components/profile-data/ProfileData'
import { ProfileOrders } from './components/profile-orders/ProfileOrders'
import './profile-page.scss'

export const ProfilePage = () => {
  return (
    <Flex className="profile-page__container" gap={20} align="center" justify="space-between">
      <ProfileData />
      <ProfileOrders />
    </Flex>
  )
}
