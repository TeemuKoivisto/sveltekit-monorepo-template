import { Router } from 'express'

import { authenticate, validateBody } from '$middlewares'

import * as authCtrl from './routes/auth/auth.ctrl'
import * as oAuthCtrl from './routes/oauth/oauth.ctrl'
import * as userCtrl from './routes/user/user.ctrl'

const router = Router()

router.post('/login', validateBody(authCtrl.LOGIN_SCHEMA), authCtrl.login)
router.post('/sign-up', validateBody(authCtrl.SIGN_UP_SCHEMA), authCtrl.signUp)
router.post('/password/reset', validateBody(authCtrl.RESET_PASSWORD), authCtrl.resetPassword)

router.get('/google/login', oAuthCtrl.googleSignIn)
router.get('/google/callback', oAuthCtrl.googleCallback)

router.get('/users', authenticate, userCtrl.listUsers)
router.get('/user/:userId', authenticate, userCtrl.getUser)
router.put(
  '/user/:userId',
  authenticate,
  validateBody(userCtrl.USER_EDIT_SCHEMA),
  userCtrl.editUser
)
router.delete('/user/:userId', authenticate, userCtrl.deleteUser)

export default router
