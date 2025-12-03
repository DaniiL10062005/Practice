import { render, screen, fireEvent, waitFor } from './test-utils'
import { RegisterPage } from '../pages/register/RegisterPage'
import { useRegisterUser } from '../utils/queries/hooks/user'

// --- мок навигации ---
const navigateMock = jest.fn()

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})

// --- мок axios-клиентов, чтобы не падать на import.meta ---
// Путь ровно такой, как в исходнике: src/utils/queries/request-client.ts
jest.mock('../utils/queries/request-client', () => ({
  publicApi: { post: jest.fn(), get: jest.fn(), put: jest.fn(), delete: jest.fn() },
  privateApi: { post: jest.fn(), get: jest.fn(), put: jest.fn(), delete: jest.fn() },
}))

// --- мок хука регистрации ---
jest.mock('../utils/queries/hooks/user')

const mockedUseRegisterUser = useRegisterUser as jest.MockedFunction<typeof useRegisterUser>

describe('RegisterPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedUseRegisterUser.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)
  })

  const setup = () => render(<RegisterPage />)

  test('рендерит форму регистрации', () => {
    setup()

    expect(screen.getByText('Регистрация')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Ivan')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('email@example.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Введите пароль')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Введите пароль еще раз')).toBeInTheDocument()
  })

  test('валидация: пустые поля → ошибки', async () => {
    setup()

    fireEvent.click(screen.getByText('Зарегистрироваться'))

    expect(await screen.findByText('Имя обязательно')).toBeInTheDocument()
    expect(await screen.findByText('Почта обязательна')).toBeInTheDocument()
    expect(await screen.findByText('Пароль обязателен')).toBeInTheDocument()
    expect(await screen.findByText('Подтверждение пароля обязательно')).toBeInTheDocument()
  })

  test('валидация: email некорректный', async () => {
    setup()

    fireEvent.change(screen.getByPlaceholderText('Ivan'), {
      target: { value: 'User' },
    })
    fireEvent.change(screen.getByPlaceholderText('email@example.com'), {
      target: { value: 'invalid-email' },
    })
    fireEvent.change(screen.getByPlaceholderText('Введите пароль'), {
      target: { value: '123456' },
    })
    fireEvent.change(screen.getByPlaceholderText('Введите пароль еще раз'), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByText('Зарегистрироваться'))

    expect(await screen.findByText('Некорректный email')).toBeInTheDocument()
  })

  test('валидация: пароль и подтверждение не совпадают', async () => {
    setup()

    fireEvent.change(screen.getByPlaceholderText('Ivan'), {
      target: { value: 'User' },
    })
    fireEvent.change(screen.getByPlaceholderText('email@example.com'), {
      target: { value: 'user@mail.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Введите пароль'), {
      target: { value: '123456' },
    })
    fireEvent.change(screen.getByPlaceholderText('Введите пароль еще раз'), {
      target: { value: '654321' },
    })

    fireEvent.click(screen.getByText('Зарегистрироваться'))

    expect(await screen.findByText('Пароли должны совпадать')).toBeInTheDocument()
  })

  test('успешная регистрация вызывает mutate и navigate', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mutateMock = jest.fn((_data, opts?: any) => {
      opts?.onSuccess?.()
    })

    mockedUseRegisterUser.mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    setup()

    fireEvent.change(screen.getByPlaceholderText('Ivan'), {
      target: { value: 'User' },
    })
    fireEvent.change(screen.getByPlaceholderText('email@example.com'), {
      target: { value: 'user@mail.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Введите пароль'), {
      target: { value: '123456' },
    })
    fireEvent.change(screen.getByPlaceholderText('Введите пароль еще раз'), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByText('Зарегистрироваться'))

    await waitFor(() => expect(mutateMock).toHaveBeenCalledTimes(1))

    const args = mutateMock.mock.calls[0][0]
    expect(args).toEqual({
      username: 'User',
      email: 'user@mail.com',
      password: '123456',
    })

    expect(navigateMock).toHaveBeenCalledWith('/login')
  })

  test('ошибка регистрации вызывает reset()', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mutateMock = jest.fn((_data, opts?: any) => {
      opts?.onError?.()
    })

    mockedUseRegisterUser.mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    setup()

    fireEvent.change(screen.getByPlaceholderText('Ivan'), {
      target: { value: 'User' },
    })
    fireEvent.change(screen.getByPlaceholderText('email@example.com'), {
      target: { value: 'user@mail.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Введите пароль'), {
      target: { value: '123456' },
    })
    fireEvent.change(screen.getByPlaceholderText('Введите пароль еще раз'), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByText('Зарегистрироваться'))

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Ivan')).toHaveValue('')
      expect(screen.getByPlaceholderText('email@example.com')).toHaveValue('')
      expect(screen.getByPlaceholderText('Введите пароль')).toHaveValue('')
      expect(screen.getByPlaceholderText('Введите пароль еще раз')).toHaveValue('')
    })
  })

  test('isPending блокирует кнопку', () => {
    mockedUseRegisterUser.mockReturnValue({
      mutate: jest.fn(),
      isPending: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    setup()

    const button = screen.getByRole('button', { name: 'Зарегистрироваться' })
    expect(button).toBeDisabled()
  })
})
