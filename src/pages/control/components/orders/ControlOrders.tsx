import { Card, Flex, Input, Pagination, Select } from 'antd'
import { ControlOrder } from './components/ControlOrder'
import './control-orders.scss'
import { ORDER_STATUS, type OrderStatus } from '../../../../utils/constants/order-status'
import { useGetOrders } from '../../../../utils/queries/hooks/order'
import { useState } from 'react'

export const ControlOrders = () => {
  const [orderPage, setOrderPage] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [status, setStatus] = useState<OrderStatus>('pending')
  const { data: getAllOrders } = useGetOrders({
    page: orderPage,
    limit: 10,
    search_text: searchText,
    status: status,
  })

  return (
    <Flex gap={20} vertical>
      <Card>
        <Flex gap={5}>
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Номер"
          />
          <Select
            defaultValue={status}
            onChange={(value) => setStatus(value as OrderStatus)}
            style={{ width: 120 }}
            onClick={(e) => {
              e.stopPropagation()
            }}
            options={[
              { value: 'pending', label: ORDER_STATUS.pending },
              { value: 'confirmed', label: ORDER_STATUS.confirmed },
              { value: 'delivered', label: ORDER_STATUS.delivered },
              { value: 'shipped', label: ORDER_STATUS.shipped },
              { value: 'cancelled', label: ORDER_STATUS.cancelled },
            ]}
          />
        </Flex>
      </Card>
      <Flex
        align="center"
        justify="space-between"
        style={{ width: '100%' }}
        className="control-orders"
        vertical
        gap={10}
      >
        {getAllOrders?.data.map((order) => (
          <ControlOrder order={order} key={order.id} />
        ))}
        {getAllOrders?.meta.total ? (
          <Pagination
            pageSize={10}
            defaultCurrent={1}
            total={getAllOrders.meta.total}
            onChange={(page) => setOrderPage(page)}
          />
        ) : null}
      </Flex>
    </Flex>
  )
}
