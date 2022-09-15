import type {
  IUserListResponse,
  IUserGetResponse,
  IUserEditParams,
  IUserEditResponse
} from '@awesome-org/types'

import { get, put, del } from './methods'

export const listUsers = () => get<IUserListResponse>('users', 'Failed to list users')

export const getUser = (userId: string) =>
  get<IUserGetResponse>(`user/${userId}`, 'Failed to fetch user')

export const editUser = (userId: string, payload: IUserEditParams) =>
  put<IUserEditResponse>(`user/${userId}`, payload, 'Failed to edit user')

export const deleteUser = (userId: string) =>
  del<boolean>(`user/${userId}`, 'Failed to delete user')
