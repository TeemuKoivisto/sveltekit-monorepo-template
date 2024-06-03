import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

import { resolve } from 'path'

import autoprefixer from 'autoprefixer'
import nested from 'postcss-nested'
import tailwindcss from 'tailwindcss'

/** @type {import('@sveltejs/kit').Config} */
export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: {
        // @TODO you are not supposed to need both configFilePath & plugins but the intellisense doesn't
        // work with configFilePath and providing plugins directly doesn't load Tailwind so...
        configFilePath: resolve('postcss.config.js'),
        plugins: [tailwindcss, autoprefixer, nested]
      }
    })
  ],

  kit: {
    files: {
      routes: './src/routes',
      lib: './src/lib'
    },
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html'
    }),
    alias: {
      $api: 'src/api',
      $components: 'src/components',
      $config: 'src/config',
      $context: 'src/context',
      $elements: 'src/elements',
      $stores: 'src/stores',
      $types: 'src/types',
      $utils: 'src/utils'
    }
  }
}
