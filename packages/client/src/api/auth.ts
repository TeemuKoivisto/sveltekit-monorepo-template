import type {
  ILoginParams,
  ILoginResponse,
  ISignUpParams,
  ISignUpResponse,
  IRequestPasswordResetParams,
  IPasswordResetParams
} from '@awesome-org/types'

import { DEFAULT_HEADERS, post } from './methods'

export const login = (payload: ILoginParams) =>
  post<ILoginResponse>('login', payload, 'Failed to login', DEFAULT_HEADERS)

export const signup = (payload: ISignUpParams) =>
  post<ISignUpResponse>('sign-up', payload, 'Failed to sign-up', DEFAULT_HEADERS)

export const requestResetPassword = (payload: IRequestPasswordResetParams) =>
  post<boolean>('password/reset-request', payload, 'Failed to send a reset password email')

export const resetPassword = (payload: IPasswordResetParams) =>
  post<boolean>('password/reset', payload, 'Failed to reset password')
