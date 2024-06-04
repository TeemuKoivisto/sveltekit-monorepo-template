import { Auth } from 'googleapis'

import { config } from '$common'

export const googleClient = new Auth.OAuth2Client(
  config.GOOGLE.CLIENT_ID,
  config.GOOGLE.CLIENT_SECRET,
  config.GOOGLE.CALLBACK_URL
)
