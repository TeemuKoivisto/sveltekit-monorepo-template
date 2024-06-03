import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

import { resolve } from 'path'

import autoprefixer from 'autoprefixer'
import nested from 'postcss-nested'
import tailwindcss from 'tailwindcss'

// const { DEPLOY_TO_GH } = process.env

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
    // Not working as of 22.12.2022
    // paths: {
    //   base: DEPLOY_TO_GH ? '/sveltekit-monorepo-template' : ''
    // },
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '200.html'
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
