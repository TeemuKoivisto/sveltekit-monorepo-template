import type {
  LoginParams,
  LoginResponse,
  SignUpParams,
  SignUpResponse,
  RequestPasswordResetParams,
  PasswordResetParams
} from '@awesome-org/lib'

import { DEFAULT_HEADERS, post } from './methods'

export const login = (payload: LoginParams) =>
  post<LoginResponse>('login', payload, 'Failed to login', DEFAULT_HEADERS)

export const signup = (payload: SignUpParams) =>
  post<SignUpResponse>('sign-up', payload, 'Failed to sign-up', DEFAULT_HEADERS)

export const requestResetPassword = (payload: RequestPasswordResetParams) =>
  post<boolean>('password/reset-request', payload, 'Failed to send a reset password email')

export const resetPassword = (payload: PasswordResetParams) =>
  post<boolean>('password/reset', payload, 'Failed to reset password')
