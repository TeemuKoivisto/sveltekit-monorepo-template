import { EventCategory } from '../prisma'

export { EventCategory } from '../prisma'

// GET /categories
export interface IListCategoriesResponse {
  categories: EventCategory[]
}

//GET /categories/:categoryId
export type IGetCategoryResponse = EventCategory

// POST /categories
export interface ICreateCategoryRequest {
  name: string
  body: Record<string, any>
}
export type ICreateCategoryResponse = EventCategory

// PUT /categories/:categoryId
export type IUpdateCategoryRequest = {
  name?: string
}
