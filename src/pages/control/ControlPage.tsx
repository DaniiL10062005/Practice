import { Tabs } from 'antd'
import { Grid } from 'antd'
import './control.scss'
import { ControlOrders } from './components/orders/ControlOrders'
import { ControlGoods } from './components/goods/ControlGoods'
import { useAuthGuard } from '../../utils/hooks/use-auth-guard'

export const ControlPage = () => {
  const screens = Grid.useBreakpoint()
  const CONTROL_PAGES = [
    {
      label: 'Товары',
      elem: <ControlGoods />,
    },
    {
      label: 'Заказы',
      elem: <ControlOrders />,
    },
  ]
  const { isAuthenticated } = useAuthGuard()
  if (!isAuthenticated) return null
  return (
    <div className="control">
      <Tabs
        className="control__tabs"
        defaultActiveKey="0"
        tabPosition={screens.md ? 'left' : 'top'}
        items={CONTROL_PAGES.map((item, index) => ({
          label: item.label,
          key: String(index),
          children: item.elem,
        }))}
      />
    </div>
  )
}
