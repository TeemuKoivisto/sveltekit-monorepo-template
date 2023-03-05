const getEnv = (key: string, required = true) => {
  const env = import.meta.env[key]
  if (!env && required) {
    throw new Error(`Environment variable ${key} was undefined!`)
  }
  return env
}

const parseInteger = (env?: string) => {
  try {
    return parseInt(env || '')
  } catch (err) {}
  return undefined
}

export const API_URL = getEnv('VITE_API_URL')
export const USE_MSW = parseInteger(getEnv('VITE_USE_MSW', false)) ? true : false
export const DEV = import.meta.env.DEV
// More about SvelteKit's default env variables https://vitejs.dev/guide/env-and-mode.html
// TODO rather than importing DEV everywhere, create logger that checks for DEV
// which also would allow for event logging like in Redux
