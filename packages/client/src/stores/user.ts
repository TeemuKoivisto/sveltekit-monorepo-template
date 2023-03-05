import { derived, get, writable } from 'svelte/store'
import type { IUser, IUserEditParams } from '@awesome-org/types'

import * as userApi from '$api/user'

import { user } from './auth'
import { authActions } from './auth.actions'

import { persistedWritable } from './persist'

export const users = persistedWritable<IUser[]>([], {
  key: 'users'
})

export const userActions = {
  async listUsers() {
    const resp = await userApi.listUsers()
    if ('data' in resp) {
      users.set(resp.data.users)
    }
    return resp
  },
  async getUser(userId: string) {
    const resp = await userApi.getUser(userId)
    if ('data' in resp) {
    }
    return resp
  },
  async editUser(userId: string, params: IUserEditParams) {
    const result = await userApi.editUser(userId, params)
    if ('data' in result && get(user)?.id === result.data.user.id) {
      authActions.handleEditUser(result.data.user)
    }
    return result
  },
  async deleteUser(userId: string) {
    const resp = await userApi.deleteUser(userId)
    if ('data' in resp && get(user)?.id === userId) {
      authActions.logout()
    }
    return resp
  }
}
