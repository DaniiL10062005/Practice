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
