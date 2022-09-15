import type { User as DBUser } from '../prisma'

export type IUser = Omit<DBUser, 'password'>
export { UserRole } from '../src/auth'

// GET /users
export interface IUserListResponse {
  users: IUser[]
}

// GET /user/:userId
export type IUserGetResponse = IUser

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
