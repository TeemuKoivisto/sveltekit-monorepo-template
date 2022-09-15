import { sveltekit } from '@sveltejs/kit/vite'

import { resolve } from 'path'
import { readFile } from 'fs/promises'

const pkg = JSON.parse(await readFile(new URL('./package.json', import.meta.url)))

/** @type {import('vite').UserConfig} */
export default {
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
  optimizeDeps: {
    // Avoids the extreme bundling times with big deps (over 60s)
    // https://github.com/sveltejs/kit/issues/2612#issuecomment-944922140
    // include: Object.keys(pkg.dependencies || {}).filter(
    //   d => d !== 'tailwindcss' && d !== '@iconify/svelte' && d !== 'svelte-dnd-action'
    // )
  }
}
