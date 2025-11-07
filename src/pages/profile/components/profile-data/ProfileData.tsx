import { UserOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar, Button, Card, Flex, Form, Input } from 'antd'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { ProfileValues } from '../profile-schema/profileSchema'
import profileSchema from '../profile-schema/profileSchema'
import './profile-data.scss'

export const ProfileData = () => {
  const [isEditing, setIsEditing] = useState(false)

  const userData = {
    username: 'BookLover99',
    email: 'reader@example.com',
    password: 'secret123',
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: userData,
  })

  const onSubmit = (data: ProfileValues) => {
    console.log('Сохранено:', data)
    setIsEditing(false)
  }

  const handleEditToggle = () => {
    if (isEditing) {
      reset(userData)
    }
    setIsEditing((prev) => !prev)
  }
  return (
    <Card className="profile-data__container">
      <Flex vertical gap={20} align="center">
        <Avatar size={100} icon={<UserOutlined />} />
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Имя пользователя"
                validateStatus={errors.username ? 'error' : ''}
                help={errors.username?.message}
              >
                <Input {...field} placeholder="Введите имя" disabled={!isEditing} />
              </Form.Item>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Почта"
                validateStatus={errors.email ? 'error' : ''}
                help={errors.email?.message}
              >
                <Input {...field} placeholder="email@example.com" disabled={!isEditing} />
              </Form.Item>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Пароль"
                validateStatus={errors.password ? 'error' : ''}
                help={errors.password?.message}
              >
                <Input.Password {...field} placeholder="Введите пароль" disabled={!isEditing} />
              </Form.Item>
            )}
          />

          <Flex gap={10}>
            {isEditing ? (
              <>
                <Button type="primary" htmlType="submit" block>
                  Сохранить
                </Button>
                <Button onClick={handleEditToggle} block>
                  Отмена
                </Button>
              </>
            ) : null}
          </Flex>
        </Form>
      </Flex>
      {!isEditing ? (
        <Button type="default" onClick={handleEditToggle} block>
          Редактировать
        </Button>
      ) : null}
    </Card>
  )
}
