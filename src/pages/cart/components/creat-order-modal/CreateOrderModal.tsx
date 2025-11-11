import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Form, Input, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { orderSchema, type OrderFormValues } from './order-schema/orderSchema'
import MaskedInput from 'antd-mask-input'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const CreateOrderModal = ({ open, setOpen }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      street: '',
      house: '',
      floor: '',
      apartment: '',
      comment: '',
      phone: '',
    },
  })

  const onSubmit = (values: OrderFormValues) => {
    console.log('order payload:', values)
    setOpen(false)
    reset()
  }

  const onCancel = () => {
    setOpen(false)
    reset()
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

        <Flex gap={10}>
          <div style={{ flex: 1 }}>
            <Controller
              name="street"
              control={control}
              render={({ field }) => (
                <Form.Item
                  label="Улица"
                  validateStatus={errors.street ? 'error' : ''}
                  help={errors.street?.message}
                >
                  <Input placeholder="ул. Ленина" {...field} />
                </Form.Item>
              )}
            />
          </div>
          <div style={{ width: 160 }}>
            <Controller
              name="house"
              control={control}
              render={({ field }) => (
                <Form.Item
                  label="Дом"
                  validateStatus={errors.house ? 'error' : ''}
                  help={errors.house?.message}
                >
                  <Input placeholder="10/2" {...field} />
                </Form.Item>
              )}
            />
          </div>
        </Flex>

        <Flex gap={10}>
          <div style={{ width: 160 }}>
            <Controller
              name="floor"
              control={control}
              render={({ field }) => (
                <Form.Item label="Этаж">
                  <Input placeholder="3" {...field} />
                </Form.Item>
              )}
            />
          </div>
          <div style={{ width: 160 }}>
            <Controller
              name="apartment"
              control={control}
              render={({ field }) => (
                <Form.Item label="Квартира">
                  <Input placeholder="45" {...field} />
                </Form.Item>
              )}
            />
          </div>
        </Flex>

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
