if (process.env.NODE_ENV === undefined || process.env.NODE_ENV !== 'production') {
  await import('dotenv').then(exports => {
    exports.config()
  })
}

function parseInteger(env?: string) {
  try {
    return parseInt(env || '')
  } catch (err) {}
  return undefined
}

function parseNodeEnv(NODE_ENV?: string): 'prod' | 'dev' {
  if (NODE_ENV === 'production') {
    return 'prod'
  }
  return 'dev'
}

const ENV = parseNodeEnv(process.env.NODE_ENV)
const PORT = parseInteger(process.env.PORT || '') || 7180

export const config = {
  ENV,
  PORT,
  CORS: {
    ENABLED: parseInteger(process.env.CORS_ENABLED) === 1
  },
  LOG: {
    LEVEL: process.env.LOG_LEVEL || 'info'
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || 'verylongrandomstring'
  },
  POSTGRES: {
    USER: process.env.POSTGRES_USER || 'pg-user',
    PASSWORD: process.env.POSTGRES_PASSWORD || 'my-pg-password',
    HOST: process.env.POSTGRES_HOST || 'localhost',
    PORT: parseInteger(process.env.POSTGRES_PORT) || 5432,
    DB: process.env.POSTGRES_DB || 'my_example_db'
  },
  GOOGLE: {
    CALLBACK_URL:
      ENV === 'prod'
        ? 'https://sveltekit-monorepo-template.pages.dev/oauth/google/callback'
        : `http://localhost:${PORT}/oauth/google/callback`,
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || ''
  },
  TWILIO: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || ''
  },
  API_URL: process.env.API_URL || '',
  CLIENT_URL: process.env.CLIENT_URL || ''
}
