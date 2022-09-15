import { NextFunction, Request, Response } from 'express'

import { CustomError } from '$common'
import { decryptLoginToken } from '$jwt'

function parseJwtFromHeaders(req: Request) {
  if (req.headers.authorization && req.headers.authorization.toLowerCase().includes('bearer')) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = parseJwtFromHeaders(req)
  if (!token) {
    // Without return this method would continue processing and generate TWO errors
    // of which the next one wouldn't get caught by the errorHandler
    // -> always remember to return next() inside if
    return next(new CustomError('Missing authorization header with Bearer token', 401))
  }
  const decrypted = decryptLoginToken(token)
  if ('err' in decrypted) {
    next(new CustomError(decrypted.err, decrypted.code))
  } else {
    res.locals.user = decrypted.data.user
    next()
  }
}
