import { Card } from 'antd'

const { Meta } = Card

export const ProductCard = () => {
  return (
    <Card
      hoverable
      cover={
        <img
          draggable={false}
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  )
}
