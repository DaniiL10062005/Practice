import { Button, Input, Modal } from 'antd'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { z } from 'zod'
import {
  useCreateGenre,
  useDeleteGenre,
  useGetGenreById,
  useUpdateGenre,
} from '../../../../../../utils/queries/hooks/genres'

type ChangeCategoryModal = {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isChange: boolean
  refetch: () => void
  id?: number
}

const categorySchema = z
  .string()
  .trim()
  .min(1, 'Имя категории обязательно')
  .max(50, 'Имя категории не должно превышать 50 символов')

export const CategoryModal = ({ isOpen, setOpen, isChange, refetch, id }: ChangeCategoryModal) => {
  const { mutate, isPending } = useCreateGenre()
  const [categoryName, setCategoryName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const { data: genreData } = useGetGenreById(id || -1)
  const { mutate: deleteGenre } = useDeleteGenre()
  const { mutate: updateGenre } = useUpdateGenre()

  const validateCategory = (value: string): string | null => {
    const result = categorySchema.safeParse(value)

    if (!result.success) {
      const message = result.error.issues[0]?.message || 'Неверное имя категории'
      setError(message)
      return null
    }

    setError(null)
    return result.data
  }

  const onCreate = () => {
    const validName = validateCategory(categoryName)
    if (!validName) return

    mutate(
      { genre: validName },
      {
        onSuccess: () => {
          setOpen(false)
          refetch()
          setCategoryName('')
        },
      }
    )
  }

  const onDelete = () => {
    deleteGenre(id || -1, {
      onSuccess: () => {
        setOpen(false)
        refetch()
      },
    })
  }

  const onSave = () => {
    const validName = validateCategory(categoryName)
    if (!validName) return

    updateGenre(
      { id: id || -1, genre: validName },
      {
        onSuccess: () => {
          setOpen(false)
          refetch()
          setCategoryName('')
        },
      }
    )
  }

  useEffect(() => {
    if (genreData) {
      setCategoryName(genreData.genre)
      setError(null)
    }
  }, [genreData])

  return (
    <Modal
      title={isChange ? 'Изменение категории' : 'Создание категории'}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isOpen}
      onCancel={() => setOpen(false)}
      footer={
        isChange
          ? [
              <Button key="save" disabled={isPending} onClick={onSave}>
                Сохранить
              </Button>,

              <Button key="delete" danger disabled={isPending} onClick={onDelete}>
                Удалить
              </Button>,
            ]
          : [
              <Button key="create" disabled={isPending} onClick={onCreate}>
                Создать
              </Button>,
            ]
      }
    >
      <Input
        value={categoryName}
        status={error ? 'error' : undefined}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCategoryName(e.target.value)
          if (error) {
            validateCategory(e.target.value)
          }
        }}
        placeholder="Имя категории"
      />
      {error && <div style={{ color: 'red', marginTop: 8, fontSize: 12 }}>{error}</div>}
    </Modal>
  )
}
