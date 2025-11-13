import { z } from 'zod'

export const goodSchema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  description: z.string().min(1, 'Обязательное поле'),
  author: z.string().min(1, 'Обязательное поле'),
  price: z
    .string()
    .min(1, 'Обязательное поле')
    .regex(/^[0-9]+$/, 'Цена указывается цифрами'),
  image: z
    .array(
      z.object({
        uid: z.string(),
        name: z.string(),
        url: z.string().optional(),
      })
    )
    .min(1, 'Загрузите обложку'),
})

export type GoodForm = z.infer<typeof goodSchema>
