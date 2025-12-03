import { z } from 'zod'

const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: 'Имя обязательно' })
      .min(2, { message: 'Имя должно содержать не менее 2 символов' })
      .max(30, { message: 'Имя слишком длинное' }),

    email: z
      .string()
      .min(1, { message: 'Почта обязательна' })
      .email({ message: 'Некорректный email' }),

    password: z
      .string()
      .min(1, { message: 'Пароль обязателен' })
      .min(6, { message: 'Пароль должен содержать не менее 6 символов' })
      .max(50, { message: 'Пароль слишком длинный' }),

    confirmPassword: z.string().min(1, { message: 'Подтверждение пароля обязательно' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли должны совпадать',
  })

export type RegisterValues = z.infer<typeof registerSchema>
export default registerSchema
