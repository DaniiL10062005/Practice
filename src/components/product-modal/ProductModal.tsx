import { Button, Flex, Modal, Image } from 'antd'
import { type Dispatch, type SetStateAction } from 'react'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isCart?: boolean
}

export const ProductModal = ({ open, setOpen, isCart }: Props) => {
  return (
    <Modal
      open={open}
      title="Название книги"
      closable={false}
      footer={[
        <Button key="back" onClick={() => setOpen(false)}>
          Назад
        </Button>,
        isCart ?? (
          <Button key="submit" type="primary">
            Добавить в корзину
          </Button>
        ),
      ]}
    >
      <Flex align="start" gap={10}>
        <Flex style={{ width: '50%' }}>
          <Image
            width="100%"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1x1h3e0DuqB_WaGGeu-R4joMCiwqw-C6dQ&s"
          />
        </Flex>

        <Flex style={{ width: '50%' }} vertical>
          <p style={{ margin: '0' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, vero asperiores!
            Magni neque ipsum veritatis pariatur saepe? Quam explicabo minima voluptatem magni ullam
            impedit nostrum ab cupiditate, voluptas atque harum. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Veritatis deleniti vero officiis iure, quia, possimus
            quaerat est fugiat sunt odit eius neque, dignissimos quod error ullam ducimus commodi.
            Perspiciatis, nobis!
          </p>
          <p>Автор: </p>
          <p>Цена:</p>
        </Flex>
      </Flex>
    </Modal>
  )
}
