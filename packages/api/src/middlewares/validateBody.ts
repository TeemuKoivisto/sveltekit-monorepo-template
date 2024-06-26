import { NextFunction, Response } from 'express'
import { ObjectSchema } from 'joi'

import { CustomError } from '$common/error'
import { log } from '$common/logger'
import { AnyRequest } from '$types/request'

export const validateBody =
  (schema: ObjectSchema) => async (req: AnyRequest, res: Response, next: NextFunction) => {
    const { body } = req

    const result = schema.strict().validate(body)
    log.debug('parsed JSON body', result)
    if (result.error) {
      next(new CustomError(result.error.message, 400))
    } else {
      next()
    }
  }
