import { prisma } from '$apis'

import { IUser, Result } from '@awesome-org/utils'
import { GoogleProfile } from '$types/auth'

export const googleService = {
  signInGoogleUser: async (profile: GoogleProfile): Promise<Result<IUser>> => {
    let user = await prisma.user.findFirst({
      where: { email: profile.email },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        role: true
      }
    })
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: profile.email,
          firstname: profile.given_name,
          lastname: profile.family_name,
          password: ''
        },
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
          role: true
        }
      })
    }
    return { data: user }
  }
}
