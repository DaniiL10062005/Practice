import { Card, DatePicker, Flex, Input, Select } from 'antd'
import { ControlOrder } from './components/ControlOrder'
import './control-orders.scss'

const { RangePicker } = DatePicker

export const ControlOrders = () => {
  return (
    <Flex gap={20} vertical>
      <Card>
        <Flex gap={5}>
          <Input placeholder="Номер" />
          <RangePicker style={{ width: 250 }} placeholder={['От', 'До']} />
          <Select
            defaultValue={'inProcessing'}
            style={{ width: 120 }}
            onClick={(e) => {
              e.stopPropagation()
            }}
            options={[
              { value: 'inProcessing', label: 'В обработке' },
              { value: 'onWay', label: 'Доставляется' },
              { value: 'delivered', label: 'Доставлен' },
              { value: 'formed', label: 'Формируется' },
            ]}
          />
        </Flex>
      </Card>
      <Flex className="control-orders" vertical gap={10}>
        {Array.from({ length: 20 }).map((_, index) => (
          <ControlOrder
            id={index.toString()}
            deliveryStatus={'formed'}
            goods={null}
            date={new Date().toLocaleDateString('ru-RU')}
            key={index}
          />
        ))}
      </Flex>
    </Flex>
  )
}
