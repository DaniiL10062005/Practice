export type RegisterUserRequest = {
  email: string
  password: string
  is_active?: boolean
  is_superuser?: boolean
  is_verified?: boolean
  username: string
}

export type LoginUserRequest = {
  username: string
  password: string
  scope?: string
  client_id?: string
  client_secret?: string
}
export type LoginUserResponse = {
  access_token: string
  token_type: string
}

export type GetMeResponse = {
  id: number
  email: string
  is_active: boolean
  is_superuser: boolean
  is_verified: boolean
  username: string
  phone: string
  default_address: string
  group: {
    id: number
    name: string
    permissions: string[]
    is_default: boolean
  }
}

export type UpdateMyDataRequest = {
  password?: string
  email?: string
  is_active?: boolean
  is_superuser?: boolean
  is_verified?: boolean
  group_id?: number
  username?: string
  phone?: string
  default_address?: string
}
