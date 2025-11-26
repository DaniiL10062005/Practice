import type {
  GetMeResponse,
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
  UpdateMyDataRequest,
} from '../../types/user'
import { privateApi, publicApi } from '../request-client'

export const RegisterUser = async ({
  email,
  password,
  is_active = true,
  is_superuser = false,
  is_verified = false,
  username,
}: RegisterUserRequest) => {
  try {
    const response = await publicApi.post('auth/jwt/register', {
      email,
      password,
      is_active,
      is_superuser,
      is_verified,
      username,
    })
    return response.data
  } catch (e) {
    console.log(e)
  }
}

export const AuthUser = async ({
  username,
  password,
  scope,
  client_id,
  client_secret,
}: LoginUserRequest): Promise<LoginUserResponse> => {
  try {
    const formData = new URLSearchParams()
    formData.append('grant_type', 'password')
    formData.append('username', username)
    formData.append('password', password)
    if (scope) formData.append('scope', scope)
    if (client_id) formData.append('client_id', client_id)
    if (client_secret) formData.append('client_secret', client_secret)

    const response = await publicApi.post('auth/jwt/login', formData)
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const LogoutUser = async () => {
  try {
    const response = await privateApi.post('auth/jwt/logout')
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const GetMe = async (): Promise<GetMeResponse> => {
  try {
    const response = await privateApi.get('api/v1/users/me')
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const UpdateMyData = async (data: UpdateMyDataRequest) => {
  try {
    const response = await privateApi.patch('api/v1/users/me', data)
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
