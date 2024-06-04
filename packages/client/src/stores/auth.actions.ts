import type { Jwt, LoginParams, SignUpParams, ClientUser } from '@awesome-org/lib'

import * as authApi from '$api/auth'

import { user, jwt } from './auth'

export const authActions = {
  handleGoogleSignIn(parsedUser: ClientUser, parsedJwt: Jwt) {
    user.set(parsedUser)
    jwt.set(parsedJwt)
  },
  handleEditUser(editedUser: ClientUser) {
    user.set(editedUser)
  },
  async login(params: LoginParams) {
    const result = await authApi.login(params)
    if ('data' in result) {
      user.set(result.data.user)
      jwt.set(result.data.jwt)
    }
    return result
  },
  async signUp(params: SignUpParams) {
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
  }
}
