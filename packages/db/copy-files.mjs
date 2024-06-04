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
    .access('../lib/prisma')
    .catch(() => fs.mkdir('../lib/prisma'))
    .then(() => fs.writeFile('../lib/prisma/index.d.ts', indexDts))
  await fs
    .access('../lib/prisma/runtime')
    .catch(() => fs.mkdir('../lib/prisma/runtime'))
    .then(() => fs.writeFile('../lib/prisma/runtime/library.d.ts', library))
}

copyFiles()
