import { Button, Card, Flex, Form, Input } from 'antd'
import loginSchema, { type LoginValues } from './components/login-schema/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

export const LoginPage = () => {
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
    console.log('Форма отправлена:', data)
    navigate('/')
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
                <Input placeholder="email@example.com" {...field} />
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
                <Input.Password placeholder="Введите пароль" {...field} />
              </Form.Item>
            )}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
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
