import { CategoryModal } from '../pages/control/components/goods/components/category/CategoryModal'
import { render, screen, fireEvent } from './test-utils'
import * as hooks from '../utils/queries/hooks/genres'

jest.mock('../utils/queries/hooks/genres', () => {
  return {
    useCreateGenre: jest.fn(() => ({ mutate: jest.fn(), isPending: false })),
    useUpdateGenre: jest.fn(() => ({ mutate: jest.fn() })),
    useDeleteGenre: jest.fn(() => ({ mutate: jest.fn() })),
    useGetGenreById: jest.fn(() => ({ data: null })),
  }
})

describe('CategoryModal', () => {
  const setup = (props = {}) => {
    const setOpen = jest.fn()
    const refetch = jest.fn()

    const result = render(
      <CategoryModal
        isOpen={true}
        isChange={false}
        setOpen={setOpen}
        refetch={refetch}
        id={1}
        {...props}
      />
    )

    return { setOpen, refetch, ...result }
  }

  test('рендерит модалку создания', () => {
    setup()

    expect(screen.getByText('Создание категории')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Имя категории')).toBeInTheDocument()
  })

  test('валидация: пустая строка → ошибка', () => {
    setup()

    const button = screen.getByText('Создать')
    fireEvent.click(button)

    expect(screen.getByText('Имя категории обязательно')).toBeInTheDocument()
  })

  test('валидация: переполненная строка → ошибка', () => {
    setup()

    const longString = 'a'.repeat(51)

    fireEvent.change(screen.getByPlaceholderText('Имя категории'), {
      target: { value: longString },
    })

    fireEvent.click(screen.getByText('Создать'))

    expect(screen.getByText('Имя категории не должно превышать 50 символов')).toBeInTheDocument()
  })

  test('создание категории вызывает mutate', () => {
    const createMock = jest.fn()
    jest
      .spyOn(hooks, 'useCreateGenre')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockReturnValue({ mutate: createMock, isPending: false } as any)

    const { setOpen, refetch } = setup()

    fireEvent.change(screen.getByPlaceholderText('Имя категории'), {
      target: { value: 'Фантастика' },
    })

    fireEvent.click(screen.getByText('Создать'))

    expect(createMock).toHaveBeenCalledTimes(1)

    const args = createMock.mock.calls[0][0]
    const options = createMock.mock.calls[0][1]

    expect(args).toEqual({ genre: 'Фантастика' })

    options.onSuccess()

    expect(setOpen).toHaveBeenCalledWith(false)
    expect(refetch).toHaveBeenCalled()
  })

  test('обновление категории', () => {
    const updateMock = jest.fn()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(hooks, 'useUpdateGenre').mockReturnValue({ mutate: updateMock } as any)
    jest.spyOn(hooks, 'useGetGenreById').mockReturnValue({
      data: { id: 1, genre: 'Старый жанр' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const { setOpen, refetch } = setup({ isChange: true })

    fireEvent.change(screen.getByDisplayValue('Старый жанр'), {
      target: { value: 'Новый жанр' },
    })

    fireEvent.click(screen.getByText('Сохранить'))

    expect(updateMock).toHaveBeenCalledTimes(1)

    const args = updateMock.mock.calls[0][0]
    const options = updateMock.mock.calls[0][1]

    expect(args).toEqual({ id: 1, genre: 'Новый жанр' })

    options.onSuccess()

    expect(setOpen).toHaveBeenCalledWith(false)
    expect(refetch).toHaveBeenCalled()
  })

  test('удаление категории', () => {
    const deleteMock = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(hooks, 'useDeleteGenre').mockReturnValue({ mutate: deleteMock } as any)

    const { setOpen, refetch } = setup({ isChange: true })

    fireEvent.click(screen.getByText('Удалить'))

    expect(deleteMock).toHaveBeenCalled()

    const args = deleteMock.mock.calls[0][0]
    const options = deleteMock.mock.calls[0][1]

    expect(args).toBe(1)

    options.onSuccess()

    expect(setOpen).toHaveBeenCalledWith(false)
    expect(refetch).toHaveBeenCalled()
  })
})
