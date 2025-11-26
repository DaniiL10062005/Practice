import { UserOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar, Button, Card, Flex, Form, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { ProfileValues } from '../profile-schema/profileSchema'
import profileSchema from '../profile-schema/profileSchema'
import './profile-data.scss'
import { useUserStore } from '../../../../utils/store/user-store'
import { useGetMe, useUpdateMyData } from '../../../../utils/queries/hooks/user'

export const ProfileData = () => {
  const [isEditing, setIsEditing] = useState(false)

  const user = useUserStore((s) => s.user)
  const setUser = useUserStore((s) => s.setUser)
  const { mutate: getMe } = useGetMe()
  const { mutate: updateMyData, isPending } = useUpdateMyData()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username ?? '',
      email: user?.email ?? '',
      password: '',
      default_address: user?.default_address ?? '',
    },
  })

  useEffect(() => {
    if (!user) {
      getMe(undefined, {
        onSuccess: (user) => {
          setUser(user)
          reset({
            username: user.username ?? '',
            email: user.email ?? '',
            password: '',
            default_address: user.default_address ?? '',
          })
        },
        onError: (err) => {
          console.log('Ошибка получения пользователя при загрузке профиля', err)
        },
      })
    }
  }, [user, getMe, reset, setUser])


  useEffect(() => {
    if (user) {
      reset({
        username: user.username ?? '',
        email: user.email ?? '',
        password: '',
        default_address: user.default_address ?? '',
      })
    }
  }, [user, reset])

  const onSubmit = (data: ProfileValues) => {
    updateMyData(
      {
        username: data.username,
        email: data.email,
        password: data.password || undefined,
        default_address: data.default_address ? data.default_address : undefined,
      },
      {
        onSuccess: () => {
          getMe(undefined, {
            onSuccess: (user) => {
              setUser(user)
              setIsEditing(false)
            },
            onError: (err) => {
              console.log('Ошибка получения пользователя', err)
            },
          })
        },
        onError: (err) => {
          console.log('Ошибка обновления профиля', err)
          message.error('Не удалось обновить профиль')
        },
      }
    )
  }

  const handleEditToggle = () => {
    if (isEditing && user) {
      reset({
        username: user.username ?? '',
        email: user.email ?? '',
        password: '',
        default_address: user.default_address ?? '',
      })
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
          <Controller
            name="default_address"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Адрес"
                validateStatus={errors.default_address ? 'error' : ''}
                help={errors.default_address?.message}
              >
                <Input {...field} placeholder="Введите адрес" disabled={!isEditing} />
              </Form.Item>
            )}
          />

          <Flex gap={10}>
            {isEditing ? (
              <>
                <Button loading={isPending} type="primary" htmlType="submit" block>
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
