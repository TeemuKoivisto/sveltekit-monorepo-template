import { NextFunction, Response } from 'express'
import { ObjectSchema } from 'joi'

import { ValidationError } from '$common/error'
import { log } from '$common/logger'
import { AnyRequest } from '$typings/request'

export const validateBody =
  (schema: ObjectSchema) => async (req: AnyRequest, res: Response, next: NextFunction) => {
    const { body } = req

    const result = schema.strict().validate(body)
    log.debug('parsed JSON body', result)
    if (result.error) {
      next(new ValidationError(result.error.message))
    } else {
      await next()
    }
  }
