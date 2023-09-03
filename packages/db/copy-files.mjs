import * as fs from 'node:fs/promises'

async function copyFiles() {
  const [indexDts, library, schema] = await Promise.all([
    fs.readFile('./generated/index.d.ts'),
    fs.readFile('./generated/runtime/library.d.ts'),
    fs.readFile('./generated/schema.prisma')
  ])
  await fs
    .access('../api/.prisma')
    .catch(() => fs.mkdir('../api/.prisma'))
    .then(() => fs.writeFile('../api/.prisma/schema.prisma', schema))
  await fs
    .access('../types/prisma')
    .catch(() => fs.mkdir('../types/prisma'))
    .then(() => fs.writeFile('../types/prisma/index.d.ts', indexDts))
  await fs
    .access('../types/prisma/runtime')
    .catch(() => fs.mkdir('../types/prisma/runtime'))
    .then(() => fs.writeFile('../types/prisma/runtime/library.d.ts', library))
}

copyFiles()
