import { Response, NextFunction } from 'express'
import Joi from 'joi'
import { Auth } from 'googleapis'

import { config, jwt, CustomError } from '$common'
import { googleClient } from '$apis'

import { GoogleProfile } from '$types/auth'
import { IRequest } from '$types/request'
import { googleService } from './google.svc'

import { loginToSearchQuery } from '@awesome-org/lib'

export const LOGIN_SCHEMA = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(255).required()
})

export const login = async (
  req: IRequest<{}, {}, { r?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { r } = req.query
    const redirectTo = typeof r === 'string' ? r : ''
    const client = new Auth.OAuth2Client(
      config.GOOGLE.CLIENT_ID,
      config.GOOGLE.CLIENT_SECRET,
      config.GOOGLE.CALLBACK_URL
    )
    const url = client.generateAuthUrl({
      access_type: 'online',
      redirect_uri: config.GOOGLE.CALLBACK_URL,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
      ],
      state: redirectTo
    })
    res.redirect(url)
  } catch (err) {
    next(err)
  }
}

interface CallbackQueryParams {
  code: string
  state?: string
  scope: string
  authuser: number
  prompt: string
}

/**
 * This is called with payload such as:
 * http://localhost:7001/oauth/google/callback?code=4/0AdLIrYc7rAG4iCdRAnXeup-th3bdUk2DsaEG6_mgixuhHl1yTVlQ3l9l6QUAIeyExKxQPg&scope=email%20profile%20openid%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email&authuser=0&prompt=consent
 */
export const callback = async (
  req: IRequest<{}, {}, CallbackQueryParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code, state } = req.query
    const { tokens } = await googleClient.getToken({
      code,
      redirect_uri: config.GOOGLE.CALLBACK_URL
    })
    const client = new Auth.OAuth2Client(
      config.GOOGLE.CLIENT_ID,
      config.GOOGLE.CLIENT_SECRET,
      config.GOOGLE.CALLBACK_URL
    )
    client.setCredentials(tokens)
    const request = await client.request<GoogleProfile>({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo'
    })
    const user = await googleService.signInGoogleUser(request.data)
    if ('err' in user) {
      return next(new CustomError(user.err, user.code))
    }
    const params = loginToSearchQuery(user.data, jwt.generateLoginPayload(user.data))
    res.redirect(`${state ?? 'http://localhost:5173'}?${params.toString()}`)
  } catch (err) {
    next(err)
  }
}
