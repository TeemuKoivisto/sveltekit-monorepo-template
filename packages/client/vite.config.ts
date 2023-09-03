import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

import { resolve } from 'path'

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $api: resolve('./src/api'),
      $components: resolve('./src/components'),
      $config: resolve('./src/config'),
      $context: resolve('./src/context'),
      $elements: resolve('./src/elements'),
      $stores: resolve('./src/stores'),
      $types: resolve('./src/types'),
      $utils: resolve('./src/utils')
    }
  },
  server: {
    port: 5577
  }
})
