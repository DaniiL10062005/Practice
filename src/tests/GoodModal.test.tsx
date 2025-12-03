/* eslint-disable @typescript-eslint/no-explicit-any */
// src/tests/GoodModal.test.tsx
import { render, screen, fireEvent, waitFor } from './test-utils'

import { GoodModal } from '../pages/control/components/goods/components/goods/components/GoodModal'

// --- мок axios-клиентов, чтобы не падать на import.meta ---
jest.mock('../utils/queries/request-client', () => ({
  publicApi: { post: jest.fn(), get: jest.fn(), put: jest.fn(), delete: jest.fn() },
  privateApi: { post: jest.fn(), get: jest.fn(), put: jest.fn(), delete: jest.fn() },
}))

import {
  useCreateBook,
  useDeleteBook,
  useGetBookById,
  useUpdateBook,
  useUploadBookImage,
} from '../utils/queries/hooks/books'
import { useGetGenres } from '../utils/queries/hooks/genres'
import { useGetAuthors } from '../utils/queries/hooks/authors'

// ------------------------------------------------------------------
// Мокаем antd: Select и Upload
// ------------------------------------------------------------------
jest.mock('antd', () => {
  const actual = jest.requireActual('antd')

  const MockSelect = ({ options = [], value = [], onChange, placeholder }: any) => {
    return (
      <select
        data-testid={placeholder}
        multiple
        value={value.map(String)}
        onChange={(e) => {
          const val = Number(e.target.value)
          onChange?.([val])
        }}
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    )
  }

  const MockUpload = ({ fileList = [], onChange, children }: any) => {
    return (
      <div>
        <input
          data-testid="upload-input"
          type="file"
          onChange={() => {
            const file = new File(['content'], 'cover.jpg', { type: 'image/jpeg' })
            const newFileList = [
              {
                uid: '1',
                name: 'cover.jpg',
                status: 'done',
                originFileObj: file,
              },
            ]
            onChange?.({ fileList: newFileList })
          }}
        />
        {children}
        <div data-testid="file-list-length">{fileList.length}</div>
      </div>
    )
  }

  return {
    ...actual,
    Select: MockSelect,
    Upload: MockUpload,
  }
})

// ------------------------------------------------------------------
// Мокаем хуки
// ------------------------------------------------------------------
jest.mock('../utils/queries/hooks/books')
jest.mock('../utils/queries/hooks/genres')
jest.mock('../utils/queries/hooks/authors')

const mockedUseCreateBook = useCreateBook as jest.MockedFunction<typeof useCreateBook>
const mockedUseDeleteBook = useDeleteBook as jest.MockedFunction<typeof useDeleteBook>
const mockedUseGetBookById = useGetBookById as jest.MockedFunction<typeof useGetBookById>
const mockedUseUpdateBook = useUpdateBook as jest.MockedFunction<typeof useUpdateBook>
const mockedUseUploadBookImage = useUploadBookImage as jest.MockedFunction<
  typeof useUploadBookImage
>

const mockedUseGetGenres = useGetGenres as jest.MockedFunction<typeof useGetGenres>
const mockedUseGetAuthors = useGetAuthors as jest.MockedFunction<typeof useGetAuthors>

describe('GoodModal', () => {
  const createBookMock = jest.fn()
  const uploadImageMock = jest.fn()
  const updateBookMock = jest.fn()
  const deleteBookMock = jest.fn()

  const refetchMock = jest.fn()
  const setOpenMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    mockedUseGetBookById.mockReturnValue({ data: undefined } as any)

    mockedUseCreateBook.mockReturnValue({
      mutate: createBookMock,
    } as any)

    mockedUseUploadBookImage.mockReturnValue({
      mutate: uploadImageMock,
    } as any)

    mockedUseUpdateBook.mockReturnValue({
      mutate: updateBookMock,
    } as any)

    mockedUseDeleteBook.mockReturnValue({
      mutate: deleteBookMock,
    } as any)

    mockedUseGetGenres.mockReturnValue({
      data: {
        data: [{ id: 1, genre: 'Фэнтези' }],
      },
    } as any)

    mockedUseGetAuthors.mockReturnValue({
      data: {
        data: [{ id: 10, name: 'Автор' }],
      },
    } as any)
  })

  const renderCreateModal = () =>
    render(
      <GoodModal
        isOpen={true}
        isChange={false}
        refetch={refetchMock}
        setOpen={setOpenMock as any}
      />
    )

  const renderEditModal = (bookOverride: Partial<any> = {}) => {
    mockedUseGetBookById.mockReturnValue({
      data: {
        id: 5,
        title: 'Старая книга',
        description: 'Старое описание',
        price: 500,
        page_count: 321,
        year: 2020,
        image: 'old.jpg',
        authors: [{ id: 10, name: 'Автор' }],
        genres: [{ id: 1, genre: 'Фэнтези' }],
        ...bookOverride,
      },
    } as any)

    return render(
      <GoodModal
        isOpen={true}
        isChange={true}
        id={5}
        refetch={refetchMock}
        setOpen={setOpenMock as any}
      />
    )
  }

  // утилита: получаем поле по name из всего документа (из-за портала)
  const getInputByName = (name: string) =>
    document.querySelector(`input[name="${name}"]`) as HTMLInputElement | null

  const getTextareaByName = (name: string) =>
    document.querySelector(`textarea[name="${name}"]`) as HTMLTextAreaElement | null

  // заполнение формы — всё через name-атрибуты
  const fillBaseFields = () => {
    const title = getInputByName('title')
    const description = getTextareaByName('description')
    const price = getInputByName('price')
    const pageCount = getInputByName('page_count')
    const year = getInputByName('year')

    if (!title || !description || !price || !pageCount || !year) {
      throw new Error('Одно из полей формы не найдено в DOM')
    }

    fireEvent.change(title, { target: { value: 'Новая книга' } })
    fireEvent.change(description, { target: { value: 'Описание книги' } })
    fireEvent.change(price, { target: { value: '500' } })
    fireEvent.change(pageCount, { target: { value: '321' } })
    fireEvent.change(year, { target: { value: '2024' } })

    fireEvent.change(screen.getByTestId('Выберите жанры'), {
      target: { value: '1' },
    })

    fireEvent.change(screen.getByTestId('Выберите автора'), {
      target: { value: '10' },
    })
  }

  const clickCreate = () => fireEvent.click(screen.getByText('Создать'))
  const clickSave = () => fireEvent.click(screen.getByText('Сохранить'))
  const clickDelete = () => fireEvent.click(screen.getByText('Удалить'))

  test('отображает модалку создания товара', () => {
    renderCreateModal()

    expect(screen.getByText('Создание товара')).toBeInTheDocument()

    expect(getInputByName('title')).not.toBeNull()
    expect(getTextareaByName('description')).not.toBeNull()
    expect(getInputByName('price')).not.toBeNull()
    expect(getInputByName('page_count')).not.toBeNull()
    expect(getInputByName('year')).not.toBeNull()

    expect(screen.getByTestId('Выберите жанры')).toBeInTheDocument()
    expect(screen.getByTestId('Выберите автора')).toBeInTheDocument()
    expect(screen.getByText('Создать')).toBeInTheDocument()
  })

  test('валидация: пустая форма показывает ошибки', async () => {
    renderCreateModal()

    clickCreate()

    const requiredErrors = await screen.findAllByText('Обязательное поле')
    expect(requiredErrors.length).toBeGreaterThanOrEqual(3)

    expect(await screen.findByText('Введите корректный год')).toBeInTheDocument()
    expect(await screen.findByText('Нужно выбрать хотя бы один жанр')).toBeInTheDocument()
    expect(await screen.findByText('Нужно выбрать хотя бы одного автора')).toBeInTheDocument()

    expect(createBookMock).not.toHaveBeenCalled()
    expect(uploadImageMock).not.toHaveBeenCalled()
  })

  test('успешное создание товара: загрузка картинки и вызов createBook', async () => {
    mockedUseCreateBook.mockReturnValue({
      mutate: (vars: any, opts?: any) => {
        createBookMock(vars, opts)
        opts?.onSuccess?.()
      },
    } as any)

    mockedUseUploadBookImage.mockReturnValue({
      mutate: (file: File, opts?: any) => {
        uploadImageMock(file, opts)
        opts?.onSuccess?.({ filename: 'uploaded.jpg' })
      },
    } as any)

    renderCreateModal()

    fillBaseFields()
    fireEvent.change(screen.getByTestId('upload-input'))

    clickCreate()

    await waitFor(() => {
      expect(uploadImageMock).toHaveBeenCalled()
      expect(createBookMock).toHaveBeenCalled()
    })

    const [vars] = createBookMock.mock.calls[0]
    expect(vars).toEqual({
      title: 'Новая книга',
      description: 'Описание книги',
      authors: [10],
      price: 500,
      image: 'uploaded.jpg',
      genres: [1],
      page_count: 321,
      year: 2024,
    })

    expect(refetchMock).toHaveBeenCalled()
    expect(setOpenMock).toHaveBeenCalledWith(false)
  })

  test('создание товара без файла: пишет ошибку и не вызывает upload/create', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    renderCreateModal()

    fillBaseFields()
    clickCreate()

    await waitFor(() => expect(consoleSpy).toHaveBeenCalled())

    const text = consoleSpy.mock.calls.map((c) => c.join(' ')).join(' ')
    expect(text).toContain('Файл не выбран')

    expect(uploadImageMock).not.toHaveBeenCalled()
    expect(createBookMock).not.toHaveBeenCalled()

    consoleSpy.mockRestore()
  })

  test('режим изменения: префилл формы и обновление с существующим изображением', async () => {
    mockedUseUpdateBook.mockReturnValue({
      mutate: (vars: any, opts?: any) => {
        updateBookMock(vars, opts)
        opts?.onSuccess?.()
      },
    } as any)

    renderEditModal()

    // ждём, пока RHF + reset проставят значение
    await screen.findByDisplayValue('Старая книга')

    clickSave()

    await waitFor(() => expect(updateBookMock).toHaveBeenCalled())

    const [vars] = updateBookMock.mock.calls[0]
    expect(vars).toEqual({
      id: 5,
      title: 'Старая книга',
      description: 'Старое описание',
      authors: [10],
      price: 500,
      image: 'old.jpg',
      genres: [1],
      page_count: 321,
      year: 2020,
    })

    expect(uploadImageMock).not.toHaveBeenCalled()
    expect(refetchMock).toHaveBeenCalled()
    expect(setOpenMock).toHaveBeenCalledWith(false)
  })

  test('удаление товара вызывает deleteBook и закрывает модалку', async () => {
    mockedUseDeleteBook.mockReturnValue({
      mutate: (id: number, opts?: any) => {
        deleteBookMock(id, opts)
        opts?.onSuccess?.()
      },
    } as any)

    renderEditModal()
    clickDelete()

    await waitFor(() => {
      expect(deleteBookMock).toHaveBeenCalledWith(5, expect.any(Object))
    })

    expect(refetchMock).toHaveBeenCalled()
    expect(setOpenMock).toHaveBeenCalledWith(false)
  })
})
