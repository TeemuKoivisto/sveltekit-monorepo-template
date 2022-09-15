import type { ILoginParams, ISignUpParams, IUser } from '@awesome-org/types'

import * as authApi from '$api/auth'

import { user, jwt } from './auth'
import { categoryActions } from './category'
import { eventActions } from './event'

export const authActions = {
  updateUser(updated: IUser) {
    user.set(updated)
  },
  async login(params: ILoginParams) {
    const result = await authApi.login(params)
    if ('data' in result) {
      user.set(result.data.user)
      jwt.set(result.data.jwt)
    }
    return result
  },
  async signUp(params: ISignUpParams) {
    const resp = await authApi.signup(params)
    if ('data' in resp) {
    }
    return resp
  },
  async requestResetPassword(params: { email: string }) {
    const resp = await authApi.requestResetPassword(params)
    if ('data' in resp) {
    }
    return resp
  },
  async resetPassword(params: { token: string; password: string }) {
    const resp = await authApi.resetPassword(params)
    if ('data' in resp) {
    }
    return resp
  },
  logout() {
    user.set(null)
    jwt.set(null)
    eventActions.reset()
    categoryActions.reset()
  }
}
