import { Card, Flex, Input, Pagination } from 'antd'
import { Category } from './components/category/Category'
import './home-page.scss'
import { ProductsGrid } from './components/products-grid/ProductsGrid'

const { Search } = Input

export const HomePage = () => {
  const onSearch = (value: string) => console.log(value)

  return (
    <Flex style={{ height: '100%' }} vertical align="center" justify="space-between" gap={20}>
      <Card variant='borderless' style={{ width: '100%' }}>
        <Flex vertical gap={10}>
          <Search size="large" placeholder="Поиск" onSearch={onSearch} />
          <div className="home__category">
            <Category />
          </div>
        </Flex>
      </Card>
      <ProductsGrid />
      <Pagination defaultCurrent={1} total={50} />
    </Flex>
  )
}
