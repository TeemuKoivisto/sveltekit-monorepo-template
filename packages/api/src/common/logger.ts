import pkg, { Logger } from 'winston'
const { format, createLogger, transports } = pkg

import { config } from './config'

let logFormat
// Add colors in local environment
if (config.ENV === 'production') {
  logFormat = format.combine(format.json())
} else {
  logFormat = format.combine(format.colorize(), format.simple())
}

export const log: Logger = createLogger({
  level: config.LOG.LEVEL,
  format: logFormat,
  transports: [new transports.Console()],
  exitOnError: false
})

export const logStream = {
  write: (message: string) => {
    log.info(message)
  }
}
