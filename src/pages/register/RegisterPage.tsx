import { Button, Card, Flex, Form, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import type { RegisterValues } from './components/register-schema/registerSchema'
import registerSchema from './components/register-schema/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useRegisterUser } from '../../utils/queries/hooks/user'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const { mutate, isPending } = useRegisterUser()
  const {
    handleSubmit,
    control,
    reset,
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
    mutate(
      {
        email: data.email,
        password: data.password,
        username: data.username,
      },
      {
        onSuccess: () => {
          navigate('/login')
        },
        onError: () => {
          reset()
        },
      }
    )
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
                <Input disabled={isPending} placeholder="Ivan" {...field} />
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
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Пароль"
                validateStatus={errors.confirmPassword ? 'error' : ''}
                help={errors.confirmPassword?.message}
              >
                <Input.Password
                  disabled={isPending}
                  placeholder="Введите пароль еще раз"
                  {...field}
                />
              </Form.Item>
            )}
          />
          <Form.Item>
            <Button disabled={isPending} type="primary" htmlType="submit" block>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  )
}
