import { useMutation } from '@tanstack/react-query'
import { AuthUser, GetMe, LogoutUser, RegisterUser, UpdateMyData } from '../requests/user'
import type {
  GetMeResponse,
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
  UpdateMyDataRequest,
} from '../../types/user'

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data: RegisterUserRequest) => RegisterUser(data),
  })
}

export const useAuthUser = () => {
  return useMutation<LoginUserResponse, Error, LoginUserRequest>({
    mutationFn: (data) => AuthUser(data),
  })
}
export const useLogoutUser = () => {
  return useMutation({ mutationFn: () => LogoutUser() })
}
export const useGetMe = () => {
  return useMutation<GetMeResponse, Error>({
    mutationFn: () => GetMe(),
  })
}
export const useUpdateMyData = () => {
  return useMutation<void, Error, UpdateMyDataRequest>({
    mutationFn: (data) => UpdateMyData(data),
  })
}
