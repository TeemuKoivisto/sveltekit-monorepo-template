import { DateTime } from 'luxon'

export function eqEvents(a: IEventJSON, b: IEventJSON) {
  return (
    a.id === b.id &&
    a.body === b.body &&
    a.position === b.position &&
    a.end_date === b.end_date &&
    a.start_date === b.start_date
  )
}
export function eventToJSON(e: IEvent): IEventJSON {
  return {
    ...e,
    start_date: e.start_date.toISO(),
    end_date: e.end_date.toISO()
  }
}
export function eventFromJSON(e: IEventJSON) {
  return {
    ...e,
    start_date: DateTime.fromISO(e.start_date),
    end_date: DateTime.fromISO(e.end_date)
  }
}

export type IEventJSON = Omit<IEvent, 'start_date' | 'end_date'> & {
  start_date: string
  end_date: string
}
export interface IEvent {
  id: string
  position: number
  start_date: DateTime
  end_date: DateTime
  body: string
  // type?: string // 'SCHEDULED' | 'ERRAND' // CONTINUOUS?
  // tags?: string[]
  // interval: string // 30min | 2h | 2d | 1y
}

export interface ICategoryEvent {
  id: string
  position: number
  name: string
  // type?: string // 'SCHEDULED' | 'ERRAND' // CONTINUOUS?
  // tags?: string[]
  // interval: string // 30min | 2h | 2d | 1y
}

export interface ICategory {
  id: string
  x: number
  y: number
  name: string
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
