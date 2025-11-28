import z from 'zod'

const digits = (v: unknown) => String(v ?? '').replace(/\D/g, '')

export const orderSchema = z.object({
  fullName: z.string().min(1, 'Обязательное поле'),
  address: z.string().min(1, 'Обязательное поле'),
  comment: z.string().optional(),
  phone: z
    .string()
    .min(1, 'обязательное поле')
    .transform(digits)
    .transform((d) => (d.startsWith('8') ? `7${d.slice(1)}` : d))
    .refine((d) => /^7\d{10}$/.test(d), 'Введите номер полностью')
    .transform((d) => `+${d}`),
})

export type OrderFormValues = z.infer<typeof orderSchema>
