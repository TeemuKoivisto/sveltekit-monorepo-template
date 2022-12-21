import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import path from 'path'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json' assert { type: 'json' }

export default {
  input: 'src/index.ts',
  output: [
    {
      file: './dist/index.js',
      format: 'es'
    }
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    alias({
      entries: [
        { find: '$common', replacement: path.resolve('src/common') },
        { find: '$jwt', replacement: path.resolve('src/jwt') },
        {
          find: '$middlewares',
          replacement: path.resolve('src/middlewares')
        },
        { find: '$routes', replacement: path.resolve('src/routes') },
        {
          find: '$typings',
          replacement: path.resolve('src/typings')
        }
      ]
    }),
    typescript(),
    commonjs()
  ]
}
