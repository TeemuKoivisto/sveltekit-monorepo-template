import { PrismaClient } from '../generated'
import { hash } from 'bcrypt'

import { UserRole } from '../generated'

const prisma = new PrismaClient()

const DEFAULT_USERS = [
  {
    email: `rick@asdf.fi`,
    firstname: 'Rick',
    lastname: 'Sanchez',
    role: UserRole.ADMIN
  },
  {
    email: `morty@asdf.fi`,
    firstname: 'Morty',
    lastname: 'Smith',
    role: UserRole.USER
  }
]

async function insertUser(userParams: typeof DEFAULT_USERS[0], password: string) {
  return prisma.user.upsert({
    where: { email: userParams.email },
    update: {},
    create: {
      ...userParams,
      password
    }
  })
}

async function main() {
  const password = await hash('asdfasdf', 10)
  const users = await Promise.all(DEFAULT_USERS.map(user => insertUser(user, password)))
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
