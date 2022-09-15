import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import { config } from './common/config'
import { logStream, CustomError } from './common'
import { errorHandler } from './middlewares'
import routes from './routes'

const app = express()

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!config.CORS.ENABLED) {
      callback(null, true)
    } else {
      callback(new CustomError('Not allowed by CORS', 403))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// By adding this route before morgan prevents it being logged which in production setting
// is annoying and pollutes the logs with gazillion "GET /health" lines
app.get('/health', (req: any, res: any) => {
  res.sendStatus(200)
})

app.use(morgan('short', { stream: logStream }))

app.use('', routes)
app.use(errorHandler)

export { app }
