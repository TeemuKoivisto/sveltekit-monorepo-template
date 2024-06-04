import { UserEditParams, ClientUser, ListedUser, Optional, Result } from '@awesome-org/lib'
import { User } from '@awesome-org/db'

import { prisma } from '$apis'

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
  updateUser: async (userId: string, params: UserEditParams): Promise<Result<ClientUser>> => {
    const user: Optional<ClientUser, 'password'> | null = await prisma.user.update({
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
  async deleteUser(userId: string): Promise<Result<ClientUser>> {
    const user: Optional<ClientUser, 'password'> | null = await prisma.user.delete({
      where: { id: userId }
    })
    delete user.password
    return { data: user }
  }
}
