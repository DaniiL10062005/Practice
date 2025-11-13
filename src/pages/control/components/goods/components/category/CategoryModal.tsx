import { Button, Input, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

type ChangeCategoryModal = {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isChange: boolean
}

export const CategoryModal = ({ isOpen, setOpen, isChange }: ChangeCategoryModal) => {
  const onOk = () => {
    setOpen(false)
  }
  return (
    <Modal
      title={isChange ? 'Изменение категории' : 'Создание категории'}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isOpen}
      onCancel={() => setOpen(false)}
      footer={[<Button onClick={onOk}>Сохранить</Button>]}
    >
      <Input placeholder="Имя категории" />
    </Modal>
  )
}
