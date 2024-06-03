import * as fs from 'node:fs/promises'

/**
 * Copy Prisma types manually since using it directly in types package will cause client to
 * throw due to *require* syntax in the .js files
 */
async function copyFiles() {
  const [indexDts, library] = await Promise.all([
    fs.readFile('./generated/index.d.ts'),
    fs.readFile('./generated/runtime/library.d.ts')
  ])
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
