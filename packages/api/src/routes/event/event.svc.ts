import { Result, Event, ICreateEventRequest, IUpdateEventRequest } from '@awesome-org/types'

import { CustomError, log, prisma } from '$common'

export const eventService = {
  async listEvents(userId: string): Promise<Result<Event[]>> {
    const found = await prisma.event.findMany({
      where: {
        user_id: userId
      }
    })
    return { data: found }
  },
  async findEvent(id: string): Promise<Result<Event>> {
    const found = await prisma.event.findUnique({
      where: {
        id: id
      }
    })
    if (!found) {
      return { err: 'Event not found', code: 404 }
    }
    return { data: found }
  },
  async createEvent(payload: ICreateEventRequest, userId: string): Promise<Result<Event>> {
    const saved = await prisma.event.create({
      data: {
        ...payload,
        user_id: userId
      }
    })
    return { data: saved }
  },
  async updateEvent(eventId: string, payload: IUpdateEventRequest): Promise<Result<Event>> {
    const saved = await prisma.event.update({
      data: payload,
      where: {
        id: eventId
      }
    })
    return { data: saved }
  },
  async deleteEvent(eventId: string): Promise<Result<Event>> {
    const deleted = await prisma.event.delete({
      where: {
        id: eventId
      }
    })
    return { data: deleted }
  }
}
