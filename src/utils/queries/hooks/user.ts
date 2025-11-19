import { useMutation } from '@tanstack/react-query'
import { AuthUser, LogoutUser, RegisterUser } from '../requests/user'
import type { LoginUserRequest, LoginUserResponse, RegisterUserRequest } from '../../types/user'

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
