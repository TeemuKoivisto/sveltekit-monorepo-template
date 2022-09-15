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

function parseNodeEnv(NODE_ENV?: string): 'production' | 'dev' {
  if (NODE_ENV === 'production') {
    return 'production'
  }
  return 'dev'
}

// TODO use default import
export const config = {
  ENV: parseNodeEnv(process.env.NODE_ENV),
  PORT: parseInteger(process.env.PORT) || 5070,
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
  TWILIO: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || ''
  }
}
