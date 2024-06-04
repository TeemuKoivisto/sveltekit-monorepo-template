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
      $apis: resolve('./src/apis'),
      $common: resolve('./src/common'),
      $middlewares: resolve('./src/middlewares'),
      $routes: resolve('./src/routes'),
      $types: resolve('./src/types')
    }
  },
  optimizeDeps: {
    exclude: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})]
  }
})
