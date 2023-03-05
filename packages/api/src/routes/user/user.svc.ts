import { Result, IUserEditParams, IUser, ListedUser } from '@awesome-org/types'
import { User } from '@awesome-org/db'

import { CustomError, prisma } from '$common'

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export const userService = {
  async listUsers(): Promise<Result<ListedUser[]>> {
    const found = await prisma.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true
      }
    })
    return { data: found }
  },
  async findUser(userId: string) {
    const found = await prisma.user.findFirst({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true
      },
      where: {
        id: userId
      }
    })
    if (found === null) {
      return { err: 'User not found', code: 404 }
    }
    return { data: found }
  },
  updateUser: async (userId: string, params: IUserEditParams): Promise<Result<IUser>> => {
    const user: Optional<User, 'password'> | null = await prisma.user.update({
      data: {
        ...params
      },
      where: {
        id: userId
      }
    })
    delete user.password
    return { data: user }
  },
  async deleteUser(userId: string): Promise<Result<IUser>> {
    const user: Optional<User, 'password'> | null = await prisma.user.delete({
      where: { id: userId }
    })
    delete user.password
    return { data: user }
  }
}
