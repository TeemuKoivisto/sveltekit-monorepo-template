import { Router } from 'express'

import { authenticate, validateBody } from '$middlewares'

import * as authCtrl from './routes/auth/auth.ctrl'
import * as oAuthCtrl from './routes/oauth/oauth.ctrl'
import * as eventCtrl from './routes/event/event.ctrl'
import * as categoryCtrl from './routes/event-category/event-category.ctrl'
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

router.get('/events', authenticate, eventCtrl.listEvents)
router.get('/event/:eventId', authenticate, eventCtrl.getEvent)
router.post('/event', authenticate, eventCtrl.createEvent)
router.put('/event/:eventId', authenticate, eventCtrl.updateEvent)
router.delete('/event/:eventId', authenticate, eventCtrl.deleteEvent)

router.get('/event/:eventId/event-category/labels', authenticate, categoryCtrl.listCategoryLabels)
router.get('/event-category/:categoryId', authenticate, categoryCtrl.getCategory)
router.put('/event-category/:categoryId', authenticate, categoryCtrl.updateCategory)
router.delete('/event-category/:categoryId', authenticate, categoryCtrl.deleteCategory)
router.post('/event-category', authenticate, categoryCtrl.saveCategory)

export default router
