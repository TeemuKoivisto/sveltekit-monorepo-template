import { resolve } from 'path'
import { defineConfig } from 'vite'

import pkg from './package.json' assert { type: 'json' }

export default defineConfig({
  build: {
    outDir: 'dist',
    target: 'node18',
    lib: {
      entry: resolve('src/index.ts'),
      formats: ['es'],
      fileName: 'index'
    },
    minify: false,
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})]
    }
  },
  resolve: {
    alias: {
      $common: resolve('./src/common'),
      $jwt: resolve('./src/jwt'),
      $middlewares: resolve('./src/middlewares'),
      $routes: resolve('./src/routes'),
      $typings: resolve('./src/typings')
    }
  },
  optimizeDeps: {
    exclude: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})]
  }
})
