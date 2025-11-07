import { Button, Card, Checkbox, Flex, Typography } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import './cart-product-card.scss'

const { Meta } = Card
const { Text } = Typography

type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
}

export const CartProductCard = ({ checked, onChange }: Props) => {
  return (
    <Card className="cart-product" hoverable>
      <Flex justify="space-between" align="center">
        <Flex gap={20} align="start">
          <img
            className="cart-product__image"
            draggable={false}
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
          <Meta
            className="cart-product__meta"
            title="Название книги"
            description="Цена: 133 руб."
          />
        </Flex>

        <Checkbox
          className="cart-product__checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />

        <Flex align="center" gap={10}>
          <Button>
            <MinusOutlined />
          </Button>
          <Text className="cart-product__quantity">1</Text>
          <Button>
            <PlusOutlined />
          </Button>
        </Flex>
      </Flex>
    </Card>
  )
}
