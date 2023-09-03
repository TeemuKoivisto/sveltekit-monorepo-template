import { defineConfig } from 'cypress'

const shouldSkip = false

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5577',
    setupNodeEvents(on, config) {
      on('task', {})
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push('--hide-scrollbars')
          launchOptions.args.push('--high-dpi-support')
          launchOptions.args.push('--window-size=1280,800')
        }
        return launchOptions
      })
    }
  }
})
