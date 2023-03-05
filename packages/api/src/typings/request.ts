import type { IUser } from '@awesome-org/types'
import type { Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'

export type IRequest<
  B = Record<string, any>,
  P extends ParamsDictionary = Record<string, any>,
  Q extends Record<string, any> = {}
> = Request<P, {}, B, Q>

type AuthLocals = {
  user: IUser
}

export type AuthRequest<
  B extends Record<string, any> = {},
  P extends ParamsDictionary = {},
  Q extends Record<string, any> = {}
> = Request<P, {}, B, Q, AuthLocals>

export type AuthResponse<R extends Record<string, any> = {}> = Response<R, AuthLocals>

export type AnyRequest<
  B extends Record<string, any> = Record<string, any>,
  Q extends ParamsDictionary = Record<string, any>
> = IRequest<B, Q> | AuthRequest<B, Q>
