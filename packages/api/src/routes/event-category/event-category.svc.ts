import {
  Maybe,
  EventCategory,
  ICreateCategoryRequest,
  IUpdateCategoryRequest
} from '@example/types'

import { CustomError, log, prisma } from '$common'

export const categoryService = {
  async listCategoryLabels(userId: string): Promise<Maybe<EventCategory[]>> {
    const found = await prisma.eventCategory.findMany({
      where: {
        user_id: userId
      }
    })
    return { data: found }
  },
  async getCategory(categoryId: string): Promise<Maybe<EventCategory>> {
    const found = await prisma.eventCategory.findUnique({
      where: {
        id: categoryId
      }
    })
    if (!found) {
      return { err: 'Category not found', code: 404 }
    }
    return { data: found }
  },
  async saveCategory(
    payload: ICreateCategoryRequest,
    userId: string
  ): Promise<Maybe<EventCategory>> {
    const saved = await prisma.eventCategory.create({
      data: {
        ...payload,
        user_id: userId
      }
    })
    return { data: saved }
  },
  async updateCategory(
    categoryId: string,
    payload: IUpdateCategoryRequest
  ): Promise<Maybe<EventCategory>> {
    const saved = await prisma.eventCategory.update({
      data: payload,
      where: {
        id: categoryId
      }
    })
    return { data: saved }
  },
  async deleteCategory(categoryId: string): Promise<Maybe<EventCategory>> {
    const deleted = await prisma.eventCategory.delete({
      where: {
        id: categoryId
      }
    })
    return { data: deleted }
  }
}
