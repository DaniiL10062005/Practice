import { Button, Input, Modal } from 'antd'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { z } from 'zod'
import { useCreateAuthor, useUpdateAuthor } from '../../../../../../../utils/queries/hooks/authors'
import type { Author } from '../../../../../../../utils/types/authors'

type ChangeAuthorModal = {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isChange: boolean
  refetch: () => void
  author?: Author | null
}

const authorSchema = z
  .string()
  .trim()
  .min(1, 'Имя автора обязательно')
  .max(50, 'Имя автора не должно превышать 50 символов')

export const AuthorModal = ({ isOpen, setOpen, isChange, refetch, author }: ChangeAuthorModal) => {
  const [authorName, setAuthorName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const { mutate } = useCreateAuthor()
  const { mutate: updateAuthor } = useUpdateAuthor()

  const validateAuthor = (value: string): string | null => {
    const result = authorSchema.safeParse(value)

    if (!result.success) {
      const message = result.error.issues[0]?.message || 'Некорректное имя'
      setError(message)
      return null
    }

    setError(null)
    return result.data
  }

  const onOk = () => {
    const validName = validateAuthor(authorName)
    if (!validName) return

    if (isChange && author) {
      updateAuthor(
        {
          id: author.id,
          name: validName,
        },
        {
          onSuccess: () => {
            refetch()
            setOpen(false)
            setAuthorName('')
          },
        }
      )
    } else {
      mutate(
        {
          name: validName,
        },
        {
          onSuccess: () => {
            refetch()
            setOpen(false)
            setAuthorName('')
          },
        }
      )
    }
  }

  useEffect(() => {
    if (author && isChange) {
      setAuthorName(author.name)
      setError(null)
    } else {
      setAuthorName('')
      setError(null)
    }
  }, [author, isChange])

  return (
    <Modal
      title={isChange ? 'Изменение автора' : 'Создание автора'}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isOpen}
      onCancel={() => setOpen(false)}
      footer={[
        <Button key="ok" onClick={onOk}>
          Сохранить
        </Button>,
      ]}
    >
      <Input
        value={authorName}
        status={error ? 'error' : undefined}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAuthorName(e.target.value)
          if (error) validateAuthor(e.target.value)
        }}
        placeholder="Имя автора"
      />

      {error && <div style={{ color: 'red', marginTop: 8, fontSize: 12 }}>{error}</div>}
    </Modal>
  )
}
