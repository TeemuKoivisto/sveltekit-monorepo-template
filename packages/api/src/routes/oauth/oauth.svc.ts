import { User } from '@awesome-org/db'
import { Auth } from 'googleapis'
import { Optional } from '@awesome-org/types'

import { config } from '$common/config'
import { prisma, Prisma } from '$common'

// @example
// data: {
//   sub: '103613305673220808199',
//   name: 'Teemu K',
//   given_name: 'Teemu',
//   family_name: 'K',
//   picture: 'https://lh3.googleusercontent.com/a/AGNmyxafmEKpoqG9LLnY22AH9mV_OkJPeQaiV08kGZux=s96-c',
//   email: 'tkoivisto456@gmail.com',
//   email_verified: true,
//   locale: 'en-GB'
// },
// Must be type instead of interface as can't be otherwise passed as Prisma.JsonValue
export type GoogleProfile = {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
}

export const oAuthService = {
  createOauthClient(credentials?: Auth.Credentials) {
    const client = new Auth.OAuth2Client(
      config.GOOGLE.CLIENT_ID,
      config.GOOGLE.CLIENT_SECRET,
      `${config.API_URL}/google/callback`
    )
    if (credentials) {
      client.setCredentials(credentials)
    }
    return client
  },
  async googleSignIn(profile: GoogleProfile): Promise<Optional<User, 'password'>> {
    const { email, given_name, family_name } = profile
    let user: Optional<User, 'password'> | null = await prisma.user.findFirst({
      where: { email }
    })
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          firstname: given_name,
          lastname: family_name,
          password: '',
          google_profile: profile
        }
      })
    }
    delete user?.password
    return user
  }
}
