import { Button, Card, Flex, Form, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import type { RegisterValues } from './components/register-schema/registerSchema'
import registerSchema from './components/register-schema/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
  })

  const onSubmit = (data: RegisterValues) => {
    console.log('Форма отправлена:', data)
    navigate('/login')
  }

  return (
    <Flex justify="center" align="center" style={{ height: '100vh' }}>
      <Card title="Регистрация" style={{ width: 350 }}>
        <Form name="auth" onFinish={handleSubmit(onSubmit)} layout="vertical">
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Имя"
                validateStatus={errors.username ? 'error' : ''}
                help={errors.username?.message}
              >
                <Input placeholder="Ivan" {...field} />
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
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Пароль"
                validateStatus={errors.confirmPassword ? 'error' : ''}
                help={errors.confirmPassword?.message}
              >
                <Input.Password placeholder="Введите пароль еще раз" {...field} />
              </Form.Item>
            )}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  )
}
