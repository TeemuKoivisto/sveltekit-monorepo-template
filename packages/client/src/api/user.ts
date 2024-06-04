import type {
  UserListResponse,
  UserGetResponse,
  UserEditParams,
  UserEditResponse
} from '@awesome-org/lib'

import { get, put, del } from './methods'

export const listUsers = () => get<UserListResponse>('users', 'Failed to list users')

export const getUser = (userId: string) =>
  get<UserGetResponse>(`user/${userId}`, 'Failed to fetch user')

export const editUser = (userId: string, payload: UserEditParams) =>
  put<UserEditResponse>(`user/${userId}`, payload, 'Failed to edit user')

export const deleteUser = (userId: string) =>
  del<boolean>(`user/${userId}`, 'Failed to delete user')
