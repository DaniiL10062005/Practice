/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen, waitFor } from './test-utils'

import { useUserStore } from '../utils/store/user-store'
import { useCreateOrder } from '../utils/queries/hooks/order'
import { useGetCartItems, useRemoveFromCart } from '../utils/queries/hooks/cart'
import { useGetMe } from '../utils/queries/hooks'
import { CreateOrderModal } from '../pages/cart/components/creat-order-modal/CreateOrderModal'

jest.mock('../utils/queries/request-client', () => ({
  publicApi: { post: jest.fn(), get: jest.fn(), put: jest.fn(), delete: jest.fn() },
  privateApi: { post: jest.fn(), get: jest.fn(), put: jest.fn(), delete: jest.fn() },
}))

jest.mock('../utils/store/user-store')
jest.mock('../utils/queries/hooks/user')
jest.mock('../utils/queries/hooks/order')
jest.mock('../utils/queries/hooks/cart')

const mockedUserStore = useUserStore as jest.MockedFunction<typeof useUserStore>
const mockedUseGetMe = useGetMe as jest.MockedFunction<typeof useGetMe>
const mockedUseCreateOrder = useCreateOrder as jest.MockedFunction<typeof useCreateOrder>
const mockedUseGetCartItems = useGetCartItems as jest.MockedFunction<typeof useGetCartItems>
const mockedUseRemoveFromCart = useRemoveFromCart as jest.MockedFunction<typeof useRemoveFromCart>

describe('CreateOrderModal', () => {
  const setOpenMock = jest.fn()
  const removeFromCartMock = jest.fn()
  const createOrderMock = jest.fn()
  const getMeMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    mockedUserStore.mockReturnValue({
      user: {
        username: 'Иван',
        default_address: 'ул. Ленина',
        phone: '+7 (999) 123-45-67',
      },
      setUser: jest.fn(),
    } as any)

    mockedUseGetMe.mockReturnValue({ mutate: getMeMock } as any)
    mockedUseCreateOrder.mockReturnValue({ mutate: createOrderMock } as any)

    mockedUseGetCartItems.mockReturnValue({
      data: {
        data: [
          { book: { id: 1 }, quantity: 2 },
          { book: { id: 5 }, quantity: 1 },
        ],
      },
    } as any)

    mockedUseRemoveFromCart.mockReturnValue({ mutate: removeFromCartMock } as any)
  })

  const renderModal = () => render(<CreateOrderModal open={true} setOpen={setOpenMock} />)

  test('рендерится и показывает поля формы', () => {
    renderModal()

    expect(screen.getByText('Заполнение данных')).toBeInTheDocument()

    expect(screen.getByPlaceholderText('Иванов Иван Иванович')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('ул. Ленина')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Код домофона, пожелания и т.п.')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('+7 (___) ___-__-__')).toBeInTheDocument()
  })

  test('валидация: пустые поля показывают ошибки', async () => {
    mockedUserStore.mockReturnValue({ user: null, setUser: jest.fn() } as any)

    renderModal()

    fireEvent.click(screen.getByText('Оформить'))

    // fullName, address, phone
    expect(await screen.findAllByText('Обязательное поле')).toHaveLength(3)

    expect(createOrderMock).not.toHaveBeenCalled()
  })

  test('валидация: некорректный телефон', async () => {
    renderModal()

    const phoneInput = screen.getByPlaceholderText('+7 (___) ___-__-__')
    fireEvent.change(phoneInput, { target: { value: '+7 (123) 45' } })

    fireEvent.click(screen.getByText('Оформить'))

    expect(await screen.findByText('Введите номер полностью')).toBeInTheDocument()
    expect(createOrderMock).not.toHaveBeenCalled()
  })

  test('успешное создание заказа вызывает createOrder и очищает корзину', async () => {
    mockedUseCreateOrder.mockReturnValue({
      mutate: (body: any, opts?: any) => {
        createOrderMock(body)
        opts?.onSuccess?.()
      },
    } as any)

    mockedUseRemoveFromCart.mockReturnValue({ mutate: removeFromCartMock } as any)

    renderModal()

    fireEvent.click(screen.getByText('Оформить'))

    await waitFor(() => {
      expect(createOrderMock).toHaveBeenCalledTimes(1)
    })

    expect(createOrderMock).toHaveBeenCalledWith({
      items: [
        { book_id: 1, quantity: 2 },
        { book_id: 5, quantity: 1 },
      ],
      shipping_address: 'ул. Ленина',
      shipping_phone: '+79991234567',
    })

    expect(removeFromCartMock).toHaveBeenCalledWith(1)
    expect(removeFromCartMock).toHaveBeenCalledWith(5)
    expect(setOpenMock).toHaveBeenCalledWith(false)
  })

  test('крестик закрывает модалку', async () => {
    renderModal()

    const closeButton = screen.getByRole('button', { name: 'Close' })
    fireEvent.click(closeButton)

    expect(setOpenMock).toHaveBeenCalledWith(false)
  })
})
