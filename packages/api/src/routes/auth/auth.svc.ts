import { Maybe, ILoginParams, ISignUpParams, IUser } from '@teemukoivisto/types'
import { User } from '@teemukoivisto/db'
import { compare, hash } from 'bcrypt'

import { prisma } from '$common'

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export const authService = {
  loginUser: async ({ email, password }: ILoginParams): Promise<Maybe<IUser>> => {
    const user: Optional<User, 'password'> | null = await prisma.user.findFirst({
      where: { email }
    })
    if (!user) {
      return { err: 'No user found', code: 401 }
    }

    const isValid = await compare(password, user.password || '')
    if (!isValid) {
      return { err: 'Wrong password', code: 401 }
    }

    delete user.password
    return { data: user }
  },
  async createUser(params: ISignUpParams): Promise<Maybe<IUser>> {
    const { email, firstname, lastname, password } = params
    const user = await prisma.user.findFirst({ where: { email } })
    if (user) {
      return { err: 'User found with same email', code: 400 }
    }
    let hashedPass
    try {
      hashedPass = await hash(password, 15)
    } catch (err) {
      return { err: `Failed to hash password: ${err}`, code: 500 }
    }
    const created: Optional<User, 'password'> = await prisma.user.create({
      data: {
        email,
        firstname,
        lastname,
        password: hashedPass
      }
    })
    delete created?.password
    return { data: created }
  },
  async findUserWithEmail(email: string): Promise<Maybe<{ id: string }>> {
    const user = await prisma.user.findFirst({ where: { email }, select: { id: true } })
    if (user === null) {
      return { err: 'No user found with email', code: 400 }
    }
    return { data: user }
  },
  async updateUserPassword(userId: string, password: string): Promise<Maybe<boolean>> {
    let hashedPass
    try {
      hashedPass = await hash(password, 15)
    } catch (err) {
      return { err: `Failed to hash password: ${err}`, code: 500 }
    }
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        password: hashedPass
      }
    })
    return { data: true }
  }
}
