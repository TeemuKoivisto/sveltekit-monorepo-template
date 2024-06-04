import { UserRole } from '@awesome-org/db'
import {
  UserListResponse,
  UserGetResponse,
  UserEditParams,
  UserEditResponse
} from '@awesome-org/lib'
import { NextFunction, Response } from 'express'
import Joi from 'joi'

import { CustomError } from '$common'
import { AuthRequest, AuthResponse } from '$types/request'

import { userService } from './user.svc'

export const USER_EDIT_SCHEMA = Joi.object({
  firstname: Joi.string().min(1).max(255),
  lastname: Joi.string().min(1).max(255),
  email: Joi.string().email()
  // password: Joi.string().min(8).max(255),
})

export const listUsers = async (
  req: AuthRequest,
  res: AuthResponse<UserListResponse>,
  next: NextFunction
) => {
  try {
    const { user } = res.locals
    if (user.role !== UserRole.ADMIN) {
      return next(new CustomError('You do not have privileges to list users', 403))
    }
    const resp = await userService.listUsers()
    if ('data' in resp) {
      res.json({
        users: resp.data
      })
    } else {
      next(new CustomError(resp.err, resp.code))
    }
  } catch (err) {
    next(err)
  }
}

export const getUser = async (
  req: AuthRequest<{}, { userId: string }>,
  res: AuthResponse<UserGetResponse>,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const { user } = res.locals
    if (user.id !== userId && user.role !== UserRole.ADMIN) {
      return next(new CustomError('You do not have privileges to get this user', 403))
    }
    const resp = await userService.findUser(userId)
    if ('err' in resp && resp.err) {
      return next(new CustomError(resp.err, resp.code))
    }
    res.json(resp.data)
  } catch (err) {
    next(err)
  }
}

export const editUser = async (
  req: AuthRequest<UserEditParams, { userId: string }>,
  res: AuthResponse<UserEditResponse>,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const resp = await userService.updateUser(userId, req.body)
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

export const deleteUser = async (
  req: AuthRequest<{}, { userId: string }>,
  res: AuthResponse,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const { user } = res.locals
    if (user.id !== userId && user.role !== UserRole.ADMIN) {
      return next(new CustomError('You do not have privileges to delete this user', 403))
    }
    const resp = await userService.deleteUser(userId)
    if ('err' in resp) {
      return next(new CustomError(resp.err, resp.code))
    }
    res.json(true)
  } catch (err) {
    next(err)
  }
}
