import { ClientUser } from './user'

// POST /login
export interface LoginParams {
  email: string
  password: string
}
export interface LoginResponse {
  user: ClientUser
  jwt: Jwt
}
export type Jwt = {
  exp: number
  token: string
}

// POST /sign-up
export interface SignUpParams {
  email: string
  password: string
  firstname: string
  lastname: string
}
export interface SignUpResponse {
  user: ClientUser
}

// POST /password/reset-request
export interface RequestPasswordResetParams {
  email: string
}

// POST /password/reset
export interface PasswordResetParams {
  token: string
  password: string
}
