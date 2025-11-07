import { z } from 'zod'

const loginSchema = z.object({
  email: z
    .email({ message: 'Введите корректный адрес электронной почты' })
    .min(1, { message: 'Поле почты обязательно' }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен содержать не менее 6 символов' })
    .max(50, { message: 'Пароль слишком длинный' }),
})

export type LoginValues = z.infer<typeof loginSchema>

export default loginSchema
