import { Button, Card, Flex, Form, Input } from 'antd'
import loginSchema, { type LoginValues } from './components/login-schema/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useAuthUser } from '../../utils/queries/hooks/user'
import { LOCAL_STORAGE } from '../../utils/constants/local-storage'

export const LoginPage = () => {
  const { mutate, isPending } = useAuthUser()

  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  })

  const onSubmit = (data: LoginValues) => {
    mutate(
      { username: data.email, password: data.password },
      {
        onSuccess: (data) => {
          localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, data.access_token)
          navigate('/')
        },
        onError: (err) => {
          console.log('Ошибка авторизации', err)
        },
      }
    )
  }

  return (
    <Flex justify="center" align="center" style={{ height: '100vh' }}>
      <Card title="Авторизация" style={{ width: 350 }}>
        <Form name="auth" onFinish={handleSubmit(onSubmit)} layout="vertical">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Почта"
                validateStatus={errors.email ? 'error' : ''}
                help={errors.email?.message}
              >
                <Input disabled={isPending} placeholder="email@example.com" {...field} />
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
                <Input.Password disabled={isPending} placeholder="Введите пароль" {...field} />
              </Form.Item>
            )}
          />
          <Form.Item>
            <Button disabled={isPending} type="primary" htmlType="submit" block>
              Войти
            </Button>
          </Form.Item>
        </Form>
        <Button type="link" href="/register" block>
          Зарегистрироваться
        </Button>
      </Card>
    </Flex>
  )
}
