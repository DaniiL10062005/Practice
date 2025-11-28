import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Form, Input, Modal } from 'antd'
import { useEffect, type Dispatch, type SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { orderSchema, type OrderFormValues } from './order-schema/orderSchema'
import MaskedInput from 'antd-mask-input'
import { useUserStore } from '../../../../utils/store/user-store'
import { useGetMe } from '../../../../utils/queries/hooks/user'
import { useCreateOrder } from '../../../../utils/queries/hooks/order'
import { useGetCartItems, useRemoveFromCart } from '../../../../utils/queries/hooks/cart'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const CreateOrderModal = ({ open, setOpen }: Props) => {
  const { user, setUser } = useUserStore()
  const { mutate: getMe } = useGetMe()
  const { mutate: createOrder } = useCreateOrder()
  const { data: cartItems } = useGetCartItems({ page: 1, limit: 100 })
  const { mutate: removeFromCart } = useRemoveFromCart()

  useEffect(() => {
    if (!user) {
      getMe(undefined, {
        onSuccess: (user) => {
          setUser(user)
        },
        onError: (err) => {
          console.log('Ошибка получения пользователя', err)
        },
      })
    }
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: user?.username ? `${user.username}` : '',
      address: user?.default_address ? `${user.default_address}` : '',
      comment: '',
      phone: user?.phone ? `${user.phone}` : '',
    },
  })

  const onSubmit = (values: OrderFormValues) => {
    createOrder(
      {
        items:
          cartItems?.data?.map((item) => ({ book_id: item.book.id, quantity: item.quantity })) ||
          [],
        shipping_address: values.address,
        shipping_phone: values.phone,
      },
      {
        onSuccess: () => {
          cartItems?.data.forEach((i) => {
            removeFromCart(i.book.id)
          })
          setOpen(false)
          reset()
        },
      }
    )
  }

  const onCancel = () => {
    setOpen(false)
  }

  return (
    <Modal footer={null} open={open} title="Заполнение данных" closable={true} onCancel={onCancel}>
      <Form
        id="create-order-form"
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        requiredMark={false}
      >
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="ФИО"
              validateStatus={errors.fullName ? 'error' : ''}
              help={errors.fullName?.message}
            >
              <Input placeholder="Иванов Иван Иванович" {...field} />
            </Form.Item>
          )}
        />

        <div style={{ flex: 1 }}>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Улица"
                validateStatus={errors.address ? 'error' : ''}
                help={errors.address?.message}
              >
                <Input placeholder="ул. Ленина" {...field} />
              </Form.Item>
            )}
          />
        </div>

        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <Form.Item label="Комментарий к заказу">
              <Input.TextArea rows={3} placeholder="Код домофона, пожелания и т.п." {...field} />
            </Form.Item>
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Номер телефона"
              validateStatus={errors.phone ? 'error' : ''}
              help={errors.phone?.message}
            >
              <MaskedInput mask="+7 (000) 000-00-00" placeholder="+7 (___) ___-__-__" {...field} />
            </Form.Item>
          )}
        />
        <Flex align="center" justify="end">
          <Button htmlType="submit" key="submit" type="primary">
            Оформить
          </Button>
        </Flex>
      </Form>
    </Modal>
  )
}
