import { Event } from '../prisma'

export { Event } from '../prisma'

// GET /events
export interface IListEventsResponse {
  events: Event[]
}

//GET /event/:eventId
export type IGetEventResponse = Event

// POST /event
export interface ICreateEventRequest {
  name: string
  body: Record<string, any>
  category_id: string
}
export type ICreateEventResponse = Event

// PUT /event/:eventId
export type IUpdateEventRequest = {
  name?: string
  doc?: Record<string, any>
}
