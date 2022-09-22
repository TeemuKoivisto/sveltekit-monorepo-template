import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import path from 'path'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

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
        { find: '$common', replacement: path.resolve(__dirname, 'src/common') },
        { find: '$jwt', replacement: path.resolve(__dirname, 'src/jwt') },
        {
          find: '$middlewares',
          replacement: path.resolve(__dirname, 'src/middlewares')
        },
        { find: '$routes', replacement: path.resolve(__dirname, 'src/routes') },
        {
          find: '$typings',
          replacement: path.resolve(__dirname, 'src/typings')
        }
      ]
    }),
    typescript(),
    commonjs()
  ]
}
