import { Button, Form, Input, Modal, Upload } from 'antd'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { goodSchema, type GoodForm } from './goodSchema'
import { zodResolver } from '@hookform/resolvers/zod'

type ChangeCategoryModal = {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isChange: boolean
}

export const GoodModal = ({ isOpen, setOpen, isChange }: ChangeCategoryModal) => {
  const { control, handleSubmit } = useForm<GoodForm>({
    resolver: zodResolver(goodSchema),
    defaultValues: {
      title: '',
      description: '',
      author: '',
      price: '',
      image: [],
    },
  })

  const onSubmit = () => {
    setOpen(false)
  }

  return (
    <Modal
      title={isChange ? 'Изменение товара' : 'Создание товара'}
      open={isOpen}
      onCancel={() => setOpen(false)}
      footer={[<Button onClick={handleSubmit(onSubmit)}>Сохранить</Button>]}
    >
      <Form layout="vertical">
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Item
              label="Название книги"
              validateStatus={fieldState.error ? 'error' : ''}
              help={fieldState.error?.message}
            >
              <Input {...field} />
            </Form.Item>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Item
              label="Описание книги"
              validateStatus={fieldState.error ? 'error' : ''}
              help={fieldState.error?.message}
            >
              <Input.TextArea rows={4} {...field} />
            </Form.Item>
          )}
        />

        <Controller
          name="author"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Item
              label="Автор"
              validateStatus={fieldState.error ? 'error' : ''}
              help={fieldState.error?.message}
            >
              <Input {...field} />
            </Form.Item>
          )}
        />

        <Controller
          name="price"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Item
              label="Цена"
              validateStatus={fieldState.error ? 'error' : ''}
              help={fieldState.error?.message}
            >
              <Input {...field} />
            </Form.Item>
          )}
        />

        <Controller
          name="image"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Item
              label="Обложка"
              validateStatus={fieldState.error ? 'error' : ''}
              help={fieldState.error?.message}
            >
              <Upload
                listType="picture-card"
                accept="image/*"
                maxCount={1}
                fileList={field.value}
                onChange={(e) => field.onChange(e.fileList)}
              >
                <div>Загрузить</div>
              </Upload>
            </Form.Item>
          )}
        />
      </Form>
    </Modal>
  )
}
