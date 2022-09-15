import { IUser } from '@teemukoivisto/types'

export interface ILoginJwt {
  expires: number
  user: IUser
}
export interface IResetPasswordJwt {
  userId: string
}
