import { Tabs } from 'antd'
import { Grid } from 'antd'
import './control.scss'

export const ControlPage = () => {
  const screens = Grid.useBreakpoint()
  const CONTROL_PAGES = [
    {
      label: 'Товары',
      elem: <></>,
    },
    {
      label: 'Заказы',
      elem: <></>,
    },
  ]

  return (
    <div className="control">
      <Tabs
        className="control__tabs"
        defaultActiveKey="1"
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
