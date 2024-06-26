import pkg from 'jsonwebtoken'
const { sign, verify } = pkg

import { Result, ClientUser } from '@awesome-org/lib'

import { config } from '$common'
import { ILoginJwt, IResetPasswordJwt } from '$types/auth'

export function generateLoginPayload(user: ClientUser) {
  const exp = Date.now() + 86400000 * 14 // 2 weeks
  return {
    exp,
    token: sign(user, config.JWT.SECRET, { algorithm: 'HS512', expiresIn: '2w' })
  }
}

export function generatePasswordResetJwt(userId: string) {
  const payload: IResetPasswordJwt = { userId }
  return sign(payload, config.JWT.SECRET, {
    algorithm: 'HS512',
    expiresIn: '48h'
  })
}

function decryptToken<T>(token: string): Result<T> {
  try {
    return { data: verify(token, config.JWT.SECRET) as T }
  } catch (err: any) {
    return { err, code: 403 }
  }
}

export const decryptLoginToken = (token: string) => decryptToken<ILoginJwt>(token)
export const decryptPasswordResetToken = (token: string) => decryptToken<IResetPasswordJwt>(token)
