import { DateTime } from 'luxon'

export function eqCategories(a: CategoryJSON, b: CategoryJSON) {
  return JSON.stringify(a) === JSON.stringify(b)
}
export function eventToJSON(e: ICategory): CategoryJSON {
  return {
    ...e
  }
}
export function eventFromJSON(e: CategoryJSON) {
  return {
    ...e
  }
}

export type CategoryJSON = ICategory

export interface ICategoryEvent {
  id: string
  name: string
  // type?: string // 'SCHEDULED' | 'ERRAND' // CONTINUOUS?
  // tags?: string[]
  // interval: string // 30min | 2h | 2d | 1y
}

export interface ICategory {
  id: string
  name: string
  x: number
  y: number
  items: ICategoryEvent[]
}
// export interface IEventCategory {
//   id: string
//   title: string
//   color: string
//   x: number
//   y: number
//   width: number
//   events: IUnsetEvent[]
// }
