import { IUser } from './user'

// POST /login
export interface ILoginParams {
  email: string
  password: string
}
export interface ILoginResponse {
  user: IUser
  jwt: IJwt
}
export type IJwt = {
  expires: number
  token: string
}

// POST /sign-up
export interface ISignUpParams {
  email: string
  password: string
  firstname: string
  lastname: string
}
export interface ISignUpResponse {
  user: IUser
}

// POST /password/reset-request
export interface IRequestPasswordResetParams {
  email: string
}

// POST /password/reset
export interface IPasswordResetParams {
  token: string
  password: string
}
