import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

// const { DEPLOY_TO_GH } = process.env

/** @type {import('@sveltejs/kit').Config} */
export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true
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
      // default options are shown
      pages: 'build',
      assets: 'build',
      fallback: '200.html'
    })
  }
}
