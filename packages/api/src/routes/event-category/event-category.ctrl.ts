import {
  IListCategoriesResponse,
  IGetCategoryResponse,
  ICreateCategoryResponse,
  ICreateCategoryRequest,
  IUpdateCategoryRequest
} from '@awesome-org/types'
import { NextFunction } from 'express'
import Joi from 'joi'

import { CustomError } from '$common'
import { AuthRequest, AuthResponse } from '$typings/request'

import { categoryService } from './event-category.svc'

export const listCategoryLabels = async (
  req: AuthRequest<{}, { documentId: string }>,
  res: AuthResponse<IListCategoriesResponse>,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params
    const resp = await categoryService.listCategoryLabels(documentId)
    if ('err' in resp) {
      return next(new CustomError(resp.err, resp.code))
    }
    res.json({ categories: resp.data })
  } catch (err) {
    next(err)
  }
}

export const getCategory = async (
  req: AuthRequest<{}, { categoryId: string }>,
  res: AuthResponse<IGetCategoryResponse>,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params
    const resp = await categoryService.getCategory(categoryId)
    if ('err' in resp) {
      return next(new CustomError(resp.err, resp.code))
    }
    res.json(resp.data)
  } catch (err) {
    next(err)
  }
}

export const saveCategory = async (
  req: AuthRequest<ICreateCategoryRequest>,
  res: AuthResponse<ICreateCategoryResponse>,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id
    if (!userId) {
      return next(new CustomError('Missing user.id from res.locals', 401))
    }
    const resp = await categoryService.saveCategory(req.body, userId)
    if ('err' in resp) {
      return next(new CustomError(resp.err, resp.code))
    }
    res.json(resp.data)
  } catch (err) {
    next(err)
  }
}

export const updateCategory = async (
  req: AuthRequest<IUpdateCategoryRequest, { categoryId: string }>,
  res: AuthResponse,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params
    const resp = await categoryService.updateCategory(categoryId, req.body)
    if ('err' in resp) {
      return next(new CustomError(resp.err, resp.code))
    }
    res.json(true)
  } catch (err) {
    next(err)
  }
}

export const deleteCategory = async (
  req: AuthRequest<{}, { categoryId: string }>,
  res: AuthResponse,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params
    const resp = await categoryService.deleteCategory(categoryId)
    if ('err' in resp) {
      return next(new CustomError(resp.err, resp.code))
    }
    res.json(true)
  } catch (err) {
    next(err)
  }
}
