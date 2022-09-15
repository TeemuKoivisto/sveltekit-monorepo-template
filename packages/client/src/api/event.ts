import type {
  IListEventsResponse,
  IGetEventResponse,
  ICreateEventRequest,
  ICreateEventResponse,
  IUpdateEventRequest
} from '@awesome-org/types'

import { get, post, put, del } from './methods'

export const listCategoryEvents = (categoryId: string) =>
  get<IListEventsResponse>(`events/${categoryId}`, 'Fetching events failed')

export const getEvent = (eventId: string) =>
  get<IGetEventResponse>(`event/${eventId}`, 'Fetching a event failed')

export const saveEvent = (payload: ICreateEventRequest) =>
  post<ICreateEventResponse>('event', payload, 'Saving event failed')

export const updateEvent = (eventId: string, payload: IUpdateEventRequest) =>
  put<boolean>(`event/${eventId}`, payload, 'Updating event failed')

export const deleteEvent = (eventId: string) =>
  del<boolean>(`event/${eventId}`, 'Deleting event failed')
