import { PrismaClient } from '@awesome-org/db'

export const prisma = new PrismaClient()

await prisma.$connect()

export { Prisma } from '@awesome-org/db'
