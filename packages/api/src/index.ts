import { app } from './app'
import { config } from './common/config'
import { log } from './common/logger'

app.listen(config.PORT, () => {
  log.info(`@teemukoivisto/api started at port: ${config.PORT}`)
})

process.on('exit', () => {
  log.info('Shutting down server')
})
