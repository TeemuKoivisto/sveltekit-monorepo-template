import type { User as DBUser } from '../prisma'

export type IUser = Omit<DBUser, 'password'>
export { UserRole } from '../src/auth'

export type ListedUser = Omit<DBUser, 'password', 'google_profile'>
// GET /users
export interface IUserListResponse {
  users: ListedUser[]
}

// GET /user/:userId
export type IUserGetResponse = ListedUser

// PUT /user/:userId
export interface IUserEditParams {
  firstname?: string
  lastname?: string
  email?: string
  // password?: string
}
export interface IUserEditResponse {
  user: IUser
}

// DELETE /user/:userId
