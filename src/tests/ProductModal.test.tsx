/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from './test-utils'

import {
  useAddToCart,
  useGetCartItems,
  useRemoveFromCart,
  useUpdateCartItem,
} from '../utils/queries/hooks/cart'
import { ProductModal } from '../components/product-modal/ProductModal'
import type { Book } from '../utils/types/books'

jest.mock('../utils/queries/hooks/cart')

jest.mock('../utils/queries/request-client', () => ({
  publicApi: { post: jest.fn(), get: jest.fn(), put: jest.fn(), delete: jest.fn() },
  privateApi: { post: jest.fn(), get: jest.fn(), put: jest.fn(), delete: jest.fn() },
}))

// хуки
const mockedUseAddToCart = useAddToCart as jest.MockedFunction<typeof useAddToCart>
const mockedUseGetCartItems = useGetCartItems as jest.MockedFunction<typeof useGetCartItems>
const mockedUseRemoveFromCart = useRemoveFromCart as jest.MockedFunction<typeof useRemoveFromCart>
const mockedUseUpdateCartItem = useUpdateCartItem as jest.MockedFunction<typeof useUpdateCartItem>

describe('ProductModal cart actions', () => {
  const setOpenMock = jest.fn()

  const baseBook: Book = {
    id: 10,
    title: 'Тестовая книга',
    description: 'Описание',
    price: 100,
    image: 'test.jpg',
    authors: [{ name: 'Автор', id: 1 }],
    year: 0,
    publisher: '',
    publication_place: '',
    page_count: 0,
    genres: [{ genre: 'роман', id: 1 }],
  }

  const addToCartMock = jest.fn()
  const updateCartItemMock = jest.fn()
  const removeFromCartMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    mockedUseAddToCart.mockReturnValue({ mutate: addToCartMock } as any)
    mockedUseUpdateCartItem.mockReturnValue({ mutate: updateCartItemMock } as any)
    mockedUseRemoveFromCart.mockReturnValue({ mutate: removeFromCartMock } as any)

    // корзина пустая по умолчанию
    mockedUseGetCartItems.mockReturnValue({
      data: { data: [] },
    } as any)
  })

  const renderModal = (book = baseBook, isCart = false) =>
    render(<ProductModal open={true} setOpen={setOpenMock} book={book} isCart={isCart} />)

  // -------------------------------------------------------------
  // 1. Первичное добавление товара в корзину
  // -------------------------------------------------------------
  test('клик по "Добавить в корзину" вызывает addToCart', async () => {
    renderModal()

    fireEvent.click(screen.getByText('Добавить в корзину'))

    expect(addToCartMock).toHaveBeenCalledWith({ book_id: 10, quantity: 1 })
  })

  // -------------------------------------------------------------
  // 2. Если товар уже в корзине — появляются кнопки + и -
  // -------------------------------------------------------------
  test('если товар уже в корзине, показывается количество и кнопки изменения', async () => {
    mockedUseGetCartItems.mockReturnValue({
      data: { data: [{ book: baseBook, quantity: 3 }] },
    } as any)

    renderModal()

    expect(screen.getByText('3')).toBeInTheDocument()

    // кнопка +
    expect(screen.getByRole('button', { name: 'plus' })).toBeInTheDocument()

    // кнопка -
    expect(screen.getByRole('button', { name: 'minus' })).toBeInTheDocument()
  })

  // -------------------------------------------------------------
  // 3. Увеличение количества ("+")
  // -------------------------------------------------------------
  test('кнопка "+" вызывает updateCartItem (quantity = old + 1)', async () => {
    mockedUseGetCartItems.mockReturnValue({
      data: { data: [{ book: baseBook, quantity: 3 }] },
    } as any)

    renderModal()

    const plusBtn = screen.getAllByRole('button')[0] // первая кнопка — +

    fireEvent.click(plusBtn)

    expect(updateCartItemMock).toHaveBeenCalledWith({ book_id: 10, quantity: 4 })
  })

  // -------------------------------------------------------------
  // 4. Уменьшение количества ("-")
  // -------------------------------------------------------------
  test('кнопка "-" вызывает updateCartItem (quantity = old - 1)', async () => {
    mockedUseGetCartItems.mockReturnValue({
      data: { data: [{ book: baseBook, quantity: 3 }] },
    } as any)

    renderModal()

    const minusBtn = screen.getAllByRole('button')[1] // вторая кнопка — -

    fireEvent.click(minusBtn)

    expect(updateCartItemMock).toHaveBeenCalledWith({ book_id: 10, quantity: 2 })
  })

  // -------------------------------------------------------------
  // 5. Если уменьшаем с 1 → 0 — вызывается removeFromCart
  // -------------------------------------------------------------
  test('если количество становится 0, вызывается removeFromCart', async () => {
    mockedUseGetCartItems.mockReturnValue({
      data: { data: [{ book: baseBook, quantity: 1 }] },
    } as any)

    renderModal()

    const minusBtn = screen.getAllByRole('button')[1]

    fireEvent.click(minusBtn)

    expect(removeFromCartMock).toHaveBeenCalledWith(10)
    expect(updateCartItemMock).not.toHaveBeenCalled()
  })
})
