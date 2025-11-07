import { Col, Row } from 'antd'
import { ProductCard } from "../product-card/ProductCard"

export const ProductsGrid = () => {
  return (
    <Row
      wrap
      gutter={[
        { xs: 8, sm: 16, md: 24, lg: 32 },
        { xs: 8, sm: 16, md: 24, lg: 32 },
      ]}
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <Col
          key={index}
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 8 }}
          lg={{ span: 6 }}
          xl={{ span: 6 }}
          xxl={{ span: 4 }}
        >
          <ProductCard />
        </Col>
      ))}
    </Row>
  )
}
