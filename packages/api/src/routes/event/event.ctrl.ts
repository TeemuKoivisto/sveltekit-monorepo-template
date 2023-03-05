import {
  IListEventsResponse,
  ICreateEventRequest,
  ICreateEventResponse,
  IGetEventResponse,
  IUpdateEventRequest
} from '@awesome-org/types'
import { NextFunction } from 'express'
import Joi from 'joi'

import { CustomError } from '$common'
import { AuthRequest, AuthResponse } from '$typings/request'

import { eventService } from './event.svc'

export const listEvents = async (
  req: AuthRequest,
  res: AuthResponse<IListEventsResponse>,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id
    if (!userId) {
      return next(new CustomError('Missing user.id from res.locals', 401))
    }
    const resp = await eventService.listEvents(userId)
    if ('err' in resp) {
      return next(new CustomError(resp.err, resp.code))
    }
    res.json({
      events: resp.data
    })
  } catch (err) {
    next(err)
  }
}

export const getEvent = async (
  req: AuthRequest<{}, { eventId: string }>,
  res: AuthResponse<IGetEventResponse>,
  next: NextFunction
) => {
  try {
    const { eventId } = req.params
    const resp = await eventService.findEvent(eventId)
    if ('err' in resp) {
      return next(new CustomError(resp.err, resp.code))
    }
    res.json(resp.data)
  } catch (err) {
    next(err)
  }
}

export const createEvent = async (
  req: AuthRequest<ICreateEventRequest>,
  res: AuthResponse<ICreateEventResponse>,
  next: NextFunction
) => {
  try {
    const resp = await eventService.createEvent(req.body, res.locals.user.id)
    if ('err' in resp) {
      return next(new CustomError(resp.err, resp.code))
    }
    res.json(resp.data)
  } catch (err) {
    next(err)
  }
}

export const updateEvent = async (
  req: AuthRequest<IUpdateEventRequest, { eventId: string }>,
  res: AuthResponse,
  next: NextFunction
) => {
  try {
    const { eventId } = req.params
    const resp = await eventService.updateEvent(eventId, req.body)
    if ('err' in resp) {
      return next(new CustomError(resp.err, resp.code))
    }
    res.json(true)
  } catch (err) {
    next(err)
  }
}

export const deleteEvent = async (
  req: AuthRequest<{}, { eventId: string }>,
  res: AuthResponse,
  next: NextFunction
) => {
  try {
    const { eventId } = req.params
    const resp = await eventService.deleteEvent(eventId)
    if ('err' in resp) {
      return next(new CustomError(resp.err, resp.code))
    }
    res.json(true)
  } catch (err) {
    next(err)
  }
}
