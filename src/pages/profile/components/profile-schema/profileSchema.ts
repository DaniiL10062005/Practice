import z from 'zod'

const profileSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Имя должно содержать не менее 2 символов' })
    .max(30, { message: 'Имя слишком длинное' }),
  email: z
    .email({ message: 'Введите корректный адрес электронной почты' })
    .min(1, { message: 'Поле почты обязательно' }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен содержать не менее 6 символов' })
    .max(50, { message: 'Пароль слишком длинный' }),
  default_address: z.string().max(50, { message: 'Адрес слишком длинный' }).optional(),
})

export type ProfileValues = z.infer<typeof profileSchema>
export default profileSchema
