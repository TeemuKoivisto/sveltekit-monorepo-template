import {
  IListEventsResponse,
  ICreateEventRequest,
  ICreateEventResponse,
  IGetEventResponse,
  IUpdateEventRequest
} from '@teemukoivisto/types'
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
    if ('data' in resp) {
      res.json({
        events: resp.data
      })
    } else {
      next(new CustomError(resp.err, resp.code))
    }
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
    if ('data' in resp) {
      res.json(resp.data)
    } else {
      next(new CustomError(resp.err, resp.code))
    }
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
    if ('data' in resp) {
      res.json(resp.data)
    } else {
      next(new CustomError(resp.err, resp.code))
    }
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
    if ('data' in resp) {
      res.json(true)
    } else {
      next(new CustomError(resp.err, resp.code))
    }
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
    if ('data' in resp) {
      res.json(true)
    } else {
      next(new CustomError(resp.err, resp.code))
    }
  } catch (err) {
    next(err)
  }
}
