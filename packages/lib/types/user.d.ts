import type { User as DBUser } from '../prisma'

export type ClientUser = Omit<DBUser, 'password'>

export type ListedUser = Omit<DBUser, 'password' | 'google_profile'>

// GET /users
export interface UserListResponse {
  users: ListedUser[]
}

// GET /user/:userId
export type UserGetResponse = ClientUser

// PUT /user/:userId
export interface UserEditParams {
  firstname?: string
  lastname?: string
  email?: string
  // password?: string
}
export interface UserEditResponse {
  user: ClientUser
}

// DELETE /user/:userId
