import { NextFunction, Request, Response } from 'express'

import { config } from '$common/config'
import { CustomError, log } from '$common'
import { IRequest } from '$typings/request'
import { generateLoginPayload } from '$jwt'

import { GoogleProfile, oAuthService } from './oauth.svc'

export const googleSignIn = async (
  req: IRequest<{}, {}, { r: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const client = oAuthService.createOauthClient()
    const redirectPath = typeof req.query.r === 'string' ? req.query.r : ''
    const url = client.generateAuthUrl({
      access_type: 'online',
      redirect_uri: 'http://localhost:7180/google/callback',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
      ],
      state: 'sign-in/' + redirectPath
    })
    res.redirect(url)
  } catch (err) {
    next(err)
  }
}

// http://localhost:7180/google/callback?state=drive%2Ffalse&code=4%2F0AWtgzh6fcdx5GW5xy-KrualgVFff9N_MWhNnbDHO0elaSsLngeLp7g4z1dcLR2Fnc5jlaQ&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&authuser=0&prompt=consent

export const googleCallback = async (
  req: IRequest<{}, {}, { state: string; code: string; scope: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { state, code } = req.query
    const client = oAuthService.createOauthClient()
    if (state.startsWith('sign-in')) {
      const { tokens } = await client.getToken(code)
      // console.log('tokens', tokens)
      client.setCredentials(tokens)
      const request = await client.request<GoogleProfile>({
        url: 'https://www.googleapis.com/oauth2/v3/userinfo'
      })
      // console.log(request)
      if (!request.data.email_verified) {
        return next(new CustomError('Your Google email must be verified.', 400))
      }
      const user = await oAuthService.googleSignIn(request.data)
      const jwt = generateLoginPayload(user)
      res
        .status(301)
        .redirect(
          `${config.CLIENT_URL}/account?user=${encodeURIComponent(
            JSON.stringify(user)
          )}&jwt=${encodeURIComponent(JSON.stringify(jwt))}`
        )
    } else {
      return next(new CustomError('Unknown callback state: ' + state, 500))
    }
  } catch (err) {
    next(err)
  }
}
