import {
  ILoginParams,
  ILoginResponse,
  ISignUpParams,
  ISignUpResponse,
  IRequestPasswordResetParams,
  IPasswordResetParams
} from '@awesome-org/types'
import { NextFunction, Request, Response } from 'express'
import Joi, { valid } from 'joi'

import { CustomError, log } from '$common'
import { generateLoginPayload, generatePasswordResetJwt, decryptPasswordResetToken } from '$jwt'
import { IRequest } from '$typings/request'

import { authService } from './auth.svc'

export const LOGIN_SCHEMA = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(255).required()
})
export const SIGN_UP_SCHEMA = Joi.object({
  email: Joi.string().email().required(),
  firstname: Joi.string().min(1).max(255).required(),
  lastname: Joi.string().min(1).max(255).required(),
  password: Joi.string().min(8).max(255).required()
})
export const REQUEST_RESET_PASSWORD = Joi.object({
  email: Joi.string().email().required()
})
export const RESET_PASSWORD = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(8).max(255).required()
})

export const login = async (
  req: IRequest<ILoginParams>,
  res: Response<ILoginResponse>,
  next: NextFunction
) => {
  try {
    const resp = await authService.loginUser(req.body)
    if ('err' in resp) {
      return next(new CustomError(resp.err, resp.code))
    }
    res.json({
      user: resp.data,
      jwt: generateLoginPayload(resp.data)
    })
  } catch (err) {
    next(err)
  }
}

export const signUp = async (
  req: Request<ISignUpParams>,
  res: Response<ISignUpResponse>,
  next: NextFunction
) => {
  try {
    const resp = await authService.createUser(req.body)
    if ('err' in resp) {
      return next(new CustomError(resp.err, resp.code))
    }
    res.json({
      user: resp.data
    })
  } catch (err) {
    next(err)
  }
}

export const resetPassword = async (
  req: IRequest<IPasswordResetParams>,
  res: Response<boolean>,
  next: NextFunction
) => {
  try {
    const validToken = decryptPasswordResetToken(req.body.token)
    if ('err' in validToken) {
      return next(new CustomError(validToken.err, validToken.code))
    }
    const resp = await authService.updateUserPassword(validToken.data.userId, req.body.password)
    if ('err' in resp) {
      return next(new CustomError(resp.err, resp.code))
    }
    res.json(true)
  } catch (err) {
    next(err)
  }
}
