import { IUser } from '@awesome-org/utils'

export interface ILoginJwt {
  expires: number
  user: IUser
}
export interface IResetPasswordJwt {
  userId: string
}

/**
 * @example
  {
    sub: '103610303673220808199',
    name: 'Teemu K',
    given_name: 'Teemu',
    family_name: 'K',
    picture: 'https://lh3.googleusercontent.com/a/AGNmyxafmEKpoqG9LLnY22AH9mV_OkJPeQaiV08kGZux=s96-c',
    email: 'tk@gmail.com',
    email_verified: true,
    locale: 'en-GB'
  }
 */
export interface GoogleProfile {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
}
