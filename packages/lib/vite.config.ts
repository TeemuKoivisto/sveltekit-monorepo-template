import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: path.resolve('src/index.ts'),
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    minify: false
  }
})
