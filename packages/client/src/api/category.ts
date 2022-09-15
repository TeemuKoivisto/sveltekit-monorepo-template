import type {
  IListCategoriesResponse,
  IGetCategoryResponse,
  ICreateCategoryRequest,
  ICreateCategoryResponse,
  IUpdateCategoryRequest
} from '@awesome-org/types'

import { get, post, put, del } from './methods'

export const listCategories = () =>
  get<IListCategoriesResponse>(`event-categories`, 'Listing categories failed')

export const getCategory = (categoryId: string) =>
  get<IGetCategoryResponse>(`event-category/${categoryId}`, 'Fetching a category failed')

export const saveCategory = (payload: ICreateCategoryRequest) =>
  post<ICreateCategoryResponse>('event-category', payload, 'Saving category failed')

export const updateCategory = (categoryId: string, payload: IUpdateCategoryRequest) =>
  put<boolean>(`event-category/${categoryId}`, payload, 'Updating category failed')

export const deleteCategory = (categoryId: string) =>
  del<boolean>(`event-category/${categoryId}`, 'Deleting category failed')
