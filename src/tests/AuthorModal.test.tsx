import { render, screen, fireEvent } from './test-utils'
import * as hooks from '../utils/queries/hooks/authors'
import { AuthorModal } from '../pages/control/components/goods/components/goods/components/AuthorModal'

jest.mock('../utils/queries/hooks/authors', () => {
  return {
    useCreateAuthor: jest.fn(() => ({ mutate: jest.fn() })),
    useUpdateAuthor: jest.fn(() => ({ mutate: jest.fn() })),
  }
})

describe('AuthorModal', () => {
  const setup = (props = {}) => {
    const setOpen = jest.fn()
    const refetch = jest.fn()

    const result = render(
      <AuthorModal isOpen={true} isChange={false} setOpen={setOpen} refetch={refetch} {...props} />
    )

    return { setOpen, refetch, ...result }
  }

  test('рендерит модалку создания автора', () => {
    setup()

    expect(screen.getByText('Создание автора')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Имя автора')).toBeInTheDocument()
  })

  test('рендерит модалку изменения автора', () => {
    setup({
      isChange: true,
      author: { id: 10, name: 'Стивен Кинг' },
    })

    expect(screen.getByText('Изменение автора')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Стивен Кинг')).toBeInTheDocument()
  })

  test('валидация: пустая строка → ошибка', () => {
    setup()

    fireEvent.click(screen.getByText('Сохранить'))

    expect(screen.getByText('Имя автора обязательно')).toBeInTheDocument()
  })

  test('валидация: переполненная строка → ошибка', () => {
    setup()

    const longString = 'a'.repeat(51)

    fireEvent.change(screen.getByPlaceholderText('Имя автора'), {
      target: { value: longString },
    })

    fireEvent.click(screen.getByText('Сохранить'))

    expect(screen.getByText('Имя автора не должно превышать 50 символов')).toBeInTheDocument()
  })

  test('создание автора вызывает mutate', () => {
    const createMock = jest.fn()
    jest.spyOn(hooks, 'useCreateAuthor').mockReturnValue({
      mutate: createMock,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const { setOpen, refetch } = setup()

    fireEvent.change(screen.getByPlaceholderText('Имя автора'), {
      target: { value: 'Нил Гейман' },
    })

    fireEvent.click(screen.getByText('Сохранить'))

    expect(createMock).toHaveBeenCalledTimes(1)

    const args = createMock.mock.calls[0][0]
    const options = createMock.mock.calls[0][1]

    expect(args).toEqual({ name: 'Нил Гейман' })

    options.onSuccess()

    expect(setOpen).toHaveBeenCalledWith(false)
    expect(refetch).toHaveBeenCalled()
  })

  test('обновление автора вызывает mutate', () => {
    const updateMock = jest.fn()
    jest.spyOn(hooks, 'useUpdateAuthor').mockReturnValue({
      mutate: updateMock,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const { setOpen, refetch } = setup({
      isChange: true,
      author: { id: 2, name: 'Старое имя' },
    })

    fireEvent.change(screen.getByDisplayValue('Старое имя'), {
      target: { value: 'Новое имя' },
    })

    fireEvent.click(screen.getByText('Сохранить'))

    expect(updateMock).toHaveBeenCalledTimes(1)

    const args = updateMock.mock.calls[0][0]
    const options = updateMock.mock.calls[0][1]

    expect(args).toEqual({
      id: 2,
      name: 'Новое имя',
    })

    options.onSuccess()

    expect(setOpen).toHaveBeenCalledWith(false)
    expect(refetch).toHaveBeenCalled()
  })
})
